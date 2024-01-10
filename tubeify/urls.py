from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.say_hello),
    path('generate_summary/', views.generate_summary),
    path('generate_quiz/', views.generate_quiz),
]