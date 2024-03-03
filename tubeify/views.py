from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
import re
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

@csrf_exempt
@api_view(['GET','POST'])
def generate_summary(request):
    data = json.loads(request.body)
    transcript_text = data.get('transcript')
    print("transcript text:" ,transcript_text)
    print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n")
    tokenizer = AutoTokenizer.from_pretrained('tusharpuri10/Flan_t5_podcast_summary_assessment')
    tokenizer.model_max_length=4096
    summarizer = pipeline("summarization", model='tusharpuri10/Flan_t5_podcast_summary_assessment', tokenizer=tokenizer)
    summary = summarizer(transcript_text, max_length=100, min_length=60, do_sample=True)
    summary_text = summary[0]['summary_text']
    print("summary:", summary_text)
    print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n")
    return JsonResponse({'summary': summary_text})

def format_quiz_questions(quiz_questions):
    lines = quiz_questions.split("\n")
    questions = []
    question = {}

    for line in lines:
        line = line.strip()  # Remove leading and trailing whitespace
        if re.match(r'\d+\.', line):
            if question:
                questions.append(question)
            question = {
                'question': line,
                'choices': []
            }
        elif re.match(r'[a-d]\)', line):
            question['choices'].append(line)

    if question:
        questions.append(question)
    return questions


@csrf_exempt
@api_view(['GET','POST'])
def generate_quiz(request):
    data = json.loads(request.body)
    ytlink = data.get('ytlink')
    print("YouTube link:", ytlink)
    transcript_text = generate_transcript_text(ytlink)
    openai.api_key = "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"
    max_chunk_size = 20

    transcript_chunks = split_text_into_chunks(transcript_text[0:300], max_chunk_size)
    summaries = ""

    for chunk in transcript_chunks:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-16k",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that generates questions."},
                {"role": "user", "content": transcript_text},
                {"role": "user", "content": "Generate 10 quiz questions based on the text with multiple choices. Always add '$' at the end of the correct choice."},
            ]
        )
        quiz_questions = response['choices'][0]['message']['content']
        print(quiz_questions)
        quiz_data = format_quiz_questions(quiz_questions)  
        print(quiz_data) 
        return JsonResponse(quiz_data, safe=False)