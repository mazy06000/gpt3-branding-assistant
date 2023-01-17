import os
import argparse
import re
from typing import List
import openai
from dotenv import load_dotenv

load_dotenv()
MAX_INPUT_LENGTH = 12


def main():
    print('Running Gimme!')

    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    print("User input:", user_input)
    if validate_lenght(user_input):
        generate_branding_snippet(user_input)
        generate_keywords(user_input)
    else:
        raise ValueError(
            f"Input length is too long. Must be under {MAX_INPUT_LENGTH}. Submitted input is {user_input}")


def validate_lenght(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH


def generate_keywords(prompt: str) -> List[str]:

    openai.api_key = os.getenv('OPENAI_API_KEY')
    openai_prompt = f"Generate remated branding keywords for {prompt}:"
    response = openai.Completion.create(engine='davinci-instruct-beta-v3',
                                        prompt=openai_prompt,
                                        max_tokens=30)

    keywords_text = response["choices"][0]["text"].strip()
    keywords_list = re.split(",|\n|\*|-", keywords_text)
    keywords_list = [key.strip() for key in keywords_list]
    keywords_list = [key for key in keywords_list if len(key) > 0]
    keywords_list = [re.sub(r'^\d+\.', '', key).lower()
                     for key in keywords_list]
    print(keywords_list)
    return keywords_list


def generate_branding_snippet(prompt: str) -> str:

    openai.api_key = os.getenv('OPENAI_API_KEY')
    openai_prompt = f"Generate upbeat branding snippet for {prompt}:"
    response = openai.Completion.create(engine='davinci-instruct-beta-v3',
                                        prompt=openai_prompt,
                                        max_tokens=30)

    branding_text = response["choices"][0]["text"].strip()
    last_char = branding_text[-1]

    if last_char not in (".", "!", "?"):
        branding_text += "..."
    print(branding_text)
    return branding_text


if __name__ == '__main__':
    main()
