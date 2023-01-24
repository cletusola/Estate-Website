from django.shortcuts import render
from django.contrib.auth import login,logout,authenticate 
from django.contrib.auth import get_user_model 
User = get_user_model()

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response 
from rest_framework.views import APIView
from rest_framework import permissions 

from .serializers import ChangePassSerializer 




# Adding username in token serializer
class TokenSerializer(TokenObtainPairSerializer):
    @classmethod 

    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username 

        return token

# User token view
class TokenView(TokenObtainPairView):
    serializer_class = TokenSerializer

# signup view 
class SignUpView(APIView):

    permissions_classes = [
        permissions.AllowAny,
    ] 

    def post(self, request, format=None):
        data = self.request.data

        first_name = data['first_name'] 
        last_name = data['last_name']
        username = data['username']
        email = data['email']
        password = data['password']
        password2 = data['password2']

        if password == password2:
            if first_name == " ":
                return Response({
                    "error":"Firstname can not be empty"
                })
            elif last_name == " ":
                return Response({
                    "error": "Lastname can not be empty"
                })
            elif username == " ":
                return Response({
                    "error":"Username can not be empty"
                })
            elif User.objects.filter(username=username).exists():
                return Response({
                    "error":"Username already exists",
                })
            elif User.objects.filter(email=email).exists():
                return Response({
                    "error":"Email already exists",
                })
            elif len(email) < 6:
                return Response({
                    "error":"Please enter a valid email address"
                })
            elif first_name == " ":
                return Response({
                    "error":"Name can not be empty"
                })
            elif last_name == " ":
                return Response({
                    "error":"Name can not be empty"
                })
            elif len(password) < 6:
                return Response({
                    "erorr":"Password must be at least 6 characters"
                })

            else:
                user = User.objects.create_user(
                    first_name=first_name,
                    last_name=last_name,
                    username=username,
                    email=email,
                    password=password
                )
                return Response({
                    'message':'User account created successfully'
                })

        else:
            return Response({
                "error":"Passwords must match"
            })






















