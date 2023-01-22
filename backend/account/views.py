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
                    'success':'User account created successfully'
                })

        else:
            return Response({
                "error":"Passwords must match"
            })


# change password view
class ChangePassView(APIView):
    permissions_classes = [
        permissions.IsAuthenticated,
    ]  
    serializer_class = ChangePassSerializer 

    def post(self,request,format=None):
        user = User.objects.filter(username=request.user.username)
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid(raise_exception=True):
            old_password = request.data.get('old_password')
            new_password = request.data.get('new_password')
            
            if old_password != user.password:
                return Response({
                    "error":"old password is incorrect"
                })
            elif old_password == new_password:
                return Response({
                    "error":"old and new password can not be the same"
                })

            elif len(new_password) < 6:
                return Response({
                    "error":"password can not be less than 6 characters"
                }) 
            else:
                pass
            obj = user.set_password(new_password)
            obj.save()
            serializer.save()
        return Response({
            'success':'password changed successfully',
            'data': serializer.data
        })




















