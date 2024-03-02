const Twitter = require('twitter-lite');

async function tweetThread(firstTweetText, replies) {
    const client = new Twitter({
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_API_KEY_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    let lastTweetId = '';

    // Post the first tweet
    const firstTweet = await client.post('statuses/update', {
        status: firstTweetText,
    });
    lastTweetId = firstTweet.id_str;

    // Post replies in the thread
    for (const reply of replies) {
        const replyTweet = await client.post('statuses/update', {
            status: reply,
            in_reply_to_status_id: lastTweetId,
        });
        lastTweetId = replyTweet.id_str;
    }
}