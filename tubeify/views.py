from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status

@api_view(['GET'])
def say_hello(request):
    return JsonResponse({'message': 'Hello from Vercel!'})

@api_view(['GET'])
def mayank_hello(request):
    return JsonResponse({'message': 'Hello from Mayank!'})
