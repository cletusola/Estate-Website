from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import permissions,status,generics,mixins

from .serializers import (
    AgentProfileSerializer,
    UserSerializer,
    )

from .models import AgentProfile 
 
# all agents view 
class AgentView(mixins.ListModelMixin,
                  generics.GenericAPIView):
    queryset = AgentProfile.objects.filter(is_staff=False)
    serializer_class = AgentProfileSerializer

    def get(self,request,pk=None,*args,**kwargs):
        if pk:
            profile = AgentProfile.objects.get(pk=pk)
        else:
            profile = AgentProfile.objects.all()

        serializer = self.serializer_class(profile)
        return self.list(request, *args, **kwargs)

# home page agent display view 
class AgentHomePageView(mixins.ListModelMixin,
                  generics.GenericAPIView):
    queryset = AgentProfile.objects.filter(is_staff=False)[:3]
    serializer_class = AgentProfileSerializer

    def get(self,request,pk=None,*args,**kwargs):
        if pk:
            profile = AgentProfile.objects.get(pk=pk)
        else:
            profile = AgentProfile.objects.all()

        serializer = self.serializer_class(profile)
        return self.list(request, *args, **kwargs)

class AgentDetailView(generics.RetrieveAPIView):
    queryset = AgentProfile.objects.filter(is_staff=False)
    serializer_class = AgentProfileSerializer
    lookup_field = 'id'
    permission_classes = [permissions.AllowAny]  


# search particular agent / agent profile view 
class AgentProfileView(generics.RetrieveAPIView):
    queryset = AgentProfile.objects.filter(is_staff=False)
    serializer_class = AgentProfileSerializer
    lookup_field = 'username__username'
    lookup_url_kwarg = 'username'   
    permission_classes = [permissions.AllowAny]



class UpdateProfileView(APIView):
    serializer_class = AgentProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self,pk,queryset=None):
        try:
            return AgentProfile.objects.get(pk=pk)
        except:
            return Http404 

    def get(self, request, pk=None, format=None):
        if pk:
            agent = AgentProfile.objects.filter(pk=pk)
        else:
            agent = AgentProfile.objects.filter(username=request.user)

        serializer = self.serializer_class(agent, many=True)
        return Response(serializer.data)


    def put(self, request, pk=None, format=None):
        agent = AgentProfile.objects.get(pk=pk, username=request.user)
        serializer = self.serializer_class(agent, data=request.data, partial=True)

        if serializer.is_valid(raise_exception=True):
            serializer.save(
                username=request.user,
                first_name=request.user.first_name,
                last_name= request.user.last_name,
                email=request.user.email)

            return Response({
                'message': 'profile info updated successfully',
                'data': serializer.data
            })
        else:
            return Response({
                'message':'unable to update profile information'
            })
 
# user info update view
class UserView(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer

    def get_object(self,queryset=None):
        obj = get_object_or_404(User,pk=self.kwargs['user_id'])
        return obj

    def get(self,request,pk=None,**kwargs):
        if pk:
            user = User.objects.filter(pk=pk, username=request.user.username)
        else:
            user = User.objects.filter(username=request.user.username)
        
        serializer = self.serializer_class(user, many=True) 
        return Response(serializer.data)

    def put(self,request,pk=None,**kwargs):
        data = self.request.data
        user = User.objects.get(pk=pk, username=request.user.username)
        serializer = self.serializer_class(user, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            first_name = data['first_name']
            last_name = data['last_name']
            username = data['username']
            email =  data['email']

            user = request.user 
            profile = AgentProfile.objects.filter(username=request.user)
            old_username = user.username 
            chk_username = User.objects.filter(username=username)
            old_email = user.email 
            chk_email = User.objects.filter(email=email)

            if first_name == " ":
                return Response({
                    "error": "Name can not be empty"
                })     
            elif last_name == " ":
                return Response({
                    "error": "Name can not be empty"
                })
            elif username == " ":
                return Response({
                    "error": "Username can not be empty"
                })
            elif username != old_username and chk_username.count():
                return Response({
                    "error": "Username already exists"
                })
            elif email == " ":
                return Response({
                    "error": "Email can not be empty"
                })
            elif email != old_email and chk_email.count():
                return Response({
                    "error": "Email already exists"
                })
            else:
                serializer.save()
            for obj in profile:   
                if first_name == "":
                    obj.first_name=user.first_name
                else:
                    obj.first_name=first_name
                if last_name == "":
                    obj.last_name=user.last_name
                else:
                    obj.last_name=last_name
                if email == "":
                    obj.email=user.email
                else:
                    obj.email=email

                if username == "":
                    obj.username=request.user
                else:
                    obj.username=request.user
                obj.save()       
            
            return Response(serializer.data)

        return Response({
            'error':'unable to user information',
            'status': status.HTTP_404_BAD_REQUEST
        })
