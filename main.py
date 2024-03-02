from tweet_generator import TweetGenerator
from twitter_api import TwitterAPI
import sys
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def main():
    # Access environment variables
    model = os.getenv('MODEL', sys.argv[1])
    prompt = os.getenv('PROMPT', sys.argv[2])
    main_tweet = os.getenv('MAIN_TWEET', sys.argv[3])

    generator = TweetGenerator(model=model)
    tweets = generator.generate_tweets(prompt)

    twitterAPI = TwitterAPI()
    twitterAPI.tweet_thread(main_tweet, tweets)

if __name__ == "__main__":
    main()