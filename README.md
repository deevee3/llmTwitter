# LLM Twitter Thread Bot

This Python script allows users to create a Twitter thread generated by a specified Large Language Model with a given input.

[YouTube Video](https://youtu.be/X3TRGBe_lDM)

## Dependencies
You must have the following dependencies on your local machine. The versions are not strictly required but the versions listed below have been tested for compatibility.

- ollama v0.1.22
    - This package is not the same as the package that's needed for the Python script!
- Python v3.11.6

You must also run the following command in the project directory
`pip install -r requirements.txt`

## Credentials
The following environment variables must be defined. To generate the credentials, go to the [Twitter Developer Portal](https://developer.twitter.com)
- `TWITTER_API_KEY`: Twitter API Key
- `TWITTER_API_KEY_SECRET`: Twitter API Key Secret
- `TWITTER_ACCESS_TOKEN`: Twitter API Access Token for Twitter account
- `TWITTER_ACCESS_TOKEN_SECRET`: Twitter API Access Token Secret for Twitter account

## Run
```bash
python main.py $model $prompt $first_tweet
```
- `$model` is a string that represents an [ollama model](https://ollama.ai/library). This script has been tested with mistral. Compatibility with other models may require slight tweaks to the script. The model must be installed on your local machine.
- `$prompt` is a string that will be used when providing context to the model. This is the prompt that will help the model generate a body of the text for the program to tweet.
- `$first_tweet` is a string that will be used to generate the first tweet in the thread. The prompt will help generate the replies to this tweet.
