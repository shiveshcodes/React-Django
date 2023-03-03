from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('todo/', views.TodoView.as_view()),
    path('todo/<int:pk>/', views.TodoView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)