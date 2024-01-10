from django.urls import path
from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    path('say_hello/', views.say_hello, name='say_hello'),
    path('mayank_hello/', views.mayank_hello, name='mayank_hello'),
]