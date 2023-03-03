from django.shortcuts import render
from .serializers import TodoSerializer, UserSerializer
from .models import Todo
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
import json
import requests
from django.http import HttpResponse
from py_vapid import Vapid02 as VAPID

# Create your views here.

class TodoView(APIView):
    """
    List of all todos
    """

    permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]

    def get(self, request):
        todos = Todo.objects.filter(owner = request.user)
        serializer = TodoSerializer(todos, many=True)
        print(request.user)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner = request.user)
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        todo = Todo.objects.get(pk=pk , owner = request.user)
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        todo = Todo.objects.get(pk=pk, owner = request.user)
        todo.delete()
        return Response(status.HTTP_204_NO_CONTENT)
    
# class UserList(ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
    

# class UserDetail(RetrieveAPIView):
    
#     queryset = User.objects.all()
#     serializer_class = UserSerializer



def send_push_notification(request):
    # Get the subscription data from the request

    # Generate the VAPID keys
    vapid_private_key = 'MO1imXUGuOtysP98GhXkPIsvqVeaKyB5K3ZlkYw-Zpc'
    vapid_claims = {
        'sub': 'mailto:shiveshanjaligupta@gmail.com'
    }
    vapid = VAPID(
        private_key=vapid_private_key,
            )
    # Prepare the notification payload
    payload = json.dumps({
        'title': 'Post Database Updated',
        'body': 'This is a notification from the server'
    })

    # Send the notification to the subscription endpoint
    try:
        response = requests.post(
            'https://fcm.googleapis.com/fcm/send/dgZCq_PYWso:APA91bEaYGg5XBrVoGoMsw-xgtBbOqMGjAechIQ8yj5ma0fVApNP5pw5xs_MiNJ_iVE5pNlcaRkG3TKwyeEb8a-TB0eC2OLiOfELkqerCu0bsQ-1qBSyx-VCvtm8pEEwx2IM0Dni4isW',
            headers={
                'Authorization': f'WebPush {vapid.create_jwt()}',
                'Content-Type': 'application/json'
            },
            data=payload
        )
        response.raise_for_status()
        return HttpResponse(status=201)
    except requests.exceptions.RequestException as e:
        print(e)
        return HttpResponse(status=500)

# class TodoView(viewsets.ModelViewSet):
#     serializer_class = TodoSerializer
#     queryset = Todo.objects.all()
