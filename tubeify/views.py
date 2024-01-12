from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
import re
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline, AutoTokenizer
import torch
import torchaudio
import openai
import textwrap
from transformers import pipeline
import json
from django.views.decorators.csrf import csrf_exempt

@api_view(['GET'])
def say_hello(request):
    return JsonResponse({'message': 'Hello from Django!'})


def generate_transcript_text(youtube_url="https://www.youtube.com/watch?v=b9rs8yzpGYk"):
    # Extract the video ID from the URL using regular expressions
    match = re.search(r"v=([A-Za-z0-9_-]+)", youtube_url)
    if match:
        video_id = match.group(1)
    else:
        raise ValueError("Invalid YouTube URL")

    # Get the transcript from YouTube
    transcript = YouTubeTranscriptApi.get_transcript(video_id)

    # Concatenate the transcript into a single string
    transcript_text = ""
    for segment in transcript:
        transcript_text += segment["text"] + " "
    # print(transcript_text)
    return transcript_text


def split_text_into_chunks(text, max_chunk_size):
    return textwrap.wrap(text, max_chunk_size)

@csrf_exempt
@api_view(['GET','POST'])
def generate_summary(request):
    data = json.loads(request.body)
    ytlink = data.get('ytlink')
    print("YouTube link:", ytlink)
    transcript_text = generate_transcript_text(ytlink)
    # Instantiate the tokenizer and the summarization pipeline
    tokenizer = AutoTokenizer.from_pretrained('stevhliu/my_awesome_billsum_model')
    summarizer = pipeline("summarization", model='stevhliu/my_awesome_billsum_model', tokenizer=tokenizer)
    # Define chunk size in number of words
    chunk_size = 200 # you may need to adjust this value depending on the average length of your words

    print("transcrpt text: ", transcript_text)
    # Split the text into chunks
    words = transcript_text.split()
    chunks = [' '.join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]

    # Summarize each chunk
    summaries = []
    for chunk in chunks:
        # Summarize the chunk
        summary = summarizer(chunk, max_length=100, min_length=30, do_sample=False)

        # Extract the summary text
        summary_text = summary[0]['summary_text']

        # Add the summary to our list of summaries
        summaries.append(summary_text)

    # Join the summaries back together into a single summary
    final_summary = ' '.join(summaries)

    print('--------------',final_summary,'------------------')
    return JsonResponse({'message': final_summary})


def format_quiz_questions(quiz_questions):
    lines = quiz_questions.split("\n")
    questions = []
    question = {}

    for line in lines:
        if re.match(r'\d+\.', line):
            if question:
                questions.append(question)
            question = {
                'question': line,
                'choices': []
            }
        # If the line is a choice
        elif re.match(r'(\$?[a-d]\))', line):
            # Add the choice to the current question
            question['choices'].append(line)

    if question:
        questions.append(question)
    return questions

@csrf_exempt
@api_view(['GET','POST'])
def generate_quiz(request):
    data = json.loads(request.body)
    ytlink = data.get('ytlink')
    transcript_text = generate_transcript_text(ytlink)
    openai.api_key = "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"
    max_chunk_size = 20

    transcript_chunks = split_text_into_chunks(transcript_text[0:500], max_chunk_size)
    summaries = ""

    for chunk in transcript_chunks:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-16k",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that generates questions."},
                {"role": "user", "content": transcript_text},
                {"role": "user", "content": "Generate 10 quiz questions based on the text with multiple choices and add '$' at begining of correct choice."},
            ]
        )

        # The assistant's reply
        quiz_questions = response['choices'][0]['message']['content']
        quiz_data = format_quiz_questions(quiz_questions)   
        return JsonResponse(quiz_data, safe=False)