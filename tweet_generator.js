addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request, event.env))
  })
  
  async function handleRequest(request, env) {
    const { model, prompt, mainTweet } = await request.json();
    const tweets = await generateTweets(prompt, model, env);
    await tweetThread(mainTweet, tweets, env);
    return new Response('Tweets posted successfully', { status: 200 });
  }
  
  async function generateTweets(prompt, model, env) {
    const threadLimit = 19;
    let text = await generateResponse(prompt, model, env);
    let tweets = createTweetArray(text, 140); // Adjusted to 140 characters as per the original Python code
  
    if (tweets.length > threadLimit) {
      throw new Error("Response is too long");
    }
  
    return tweets;
  }
  
  async function generateResponse(prompt, model, env) {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        prompt: prompt,
        max_tokens: 1024, // Adjust based on your needs
      }),
    });
  
    const data = await response.json();
    return data.choices[0].text;
  }
  
  function createTweetArray(text, maxLength) {
    const words = text.split(/\s|\n/);
    const tweets = [];
    let currentTweet = "";
  
    words.forEach(word => {
      if ((currentTweet + word).length <= maxLength) {
        currentTweet += ` ${word}`;
      } else {
        tweets.push(currentTweet.trim());
        currentTweet = word;
      }
    });
  
    if (currentTweet) {
      tweets.push(currentTweet.trim());
    }
  
    return tweets;
  }
  
  async function tweetThread(firstTweetText, tweets, env) {
    let lastTweetId = '';
    const firstTweet = await tweet(firstTweetText, null, env);
    lastTweetId = firstTweet.id;
  
    for (const tweetText of tweets.slice(1)) { // Assuming the first tweet is handled separately
      const replyTweet = await tweet(tweetText, lastTweetId, env);
      lastTweetId = replyTweet.id;
    }
  }
  
  async function tweet(text, inReplyToTweetId, env) {
    const response = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.TWITTER_BEARER_TOKEN}`
      },
      body: JSON.stringify({
        text: text,
        ...(inReplyToTweetId && { in_reply_to_tweet_id: inReplyToTweetId }),
      }),
    });
  
    const data = await response.json();
    return data.data;
  }