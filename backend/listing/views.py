from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework.views import APIView 
from rest_framework import permissions,generics,status,mixins
from rest_framework.response import Response 
from rest_framework.authtoken.models import Token 

from .serializers import ListingSerializer
from .models import Listing 

 

#listing
class ListingView(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Listing.objects.all().order_by('-date')
    serializer_class = ListingSerializer 
    permission_classes = [permissions.AllowAny]


    def get(self,request,*args,**kwargs):
    
        listing = Listing.objects.all().order_by('-date')

        serializer = self.serializer_class(listing, many=True)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        permission_classes = [permissions.IsAuthenticated]
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(agent=request.user)
            return Response({
                "message":"listing posted successfully",
                "data": serializer.data
            })
        return Response({'message':'unable to create listing, check form for errors'})


# home page listing view
class HomeListingView(mixins.ListModelMixin,
                  generics.GenericAPIView):
    queryset = Listing.objects.all().order_by('-date')[:3]
    serializer_class = ListingSerializer 
    permission_classes = [permissions.AllowAny]

 
    def get(self,request,*args,**kwargs):

        listing = Listing.objects.all().order_by('-date')

        serializer = self.serializer_class(listing, many=True)
        return self.list(request, *args, **kwargs)


# listing details
class ListingDetials(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer 
    permission_classes = [permissions.AllowAny]

    def get_queryset(self,pk=None):
        if pk:
            return Listing.objects.filter(pk=pk).order_by('-date')
        else:
            return Listing.objects.all().order_by('-date')


    def get(self, request,pk=None,*args, **kwargs):
        serializer = self.serializer_class(self.get_queryset, many=True)
        return self.retrieve(request, *args, **kwargs)


    def update(self, request, pk=None, *args, **kwargs):
        permission_classes = [permissions.IsAuthenticated]
        listing = Listing.objects.filter(pk=pk, agent=self.request.user)
        if listing == None:
            return Response({
                "message":"No listing to display"
            })
        serializer = self.serializer_class(listing, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                'data':serializer.data,    
            })
            
        else:
            return Response({
                "message": "unable to update product"
            })

    def delete(self, request,pk=None, *args, **kwargs):
        listing = Listing.objects.filter(id=pk,agent=request.user)
        if listing == None:
            return Response({
                "message":"no listing to delete"
            })
        
        listing.delete()
        return self.destroy(request, *args, **kwargs)


# agent listings
class AgentList(mixins.ListModelMixin,
                mixins.CreateModelMixin,
                generics.GenericAPIView):

    serializer_class = ListingSerializer

    def get_queryset(self,pk=None, queryset=None): 
        user = self.request.user 
        return Listing.objects.filter(agent=user)


    def get(self, request,pk=None,*args, **kwargs):
        if pk:
            listing = self.get_queryset(pk)
        else:
            listing = self.get_queryset()
        serializer = self.serializer_class(listing, many=True)
        return self.list(request, *args, **kwargs)


# agent listing details
class AgentListDetails(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    serializer_class = ListingSerializer

    def get_queryset(self,*args, **kwargs):
    
        user = self.request.user 
        return Listing.objects.filter(agent=user)


    def get(self, request,pk=None,*args, **kwargs):
        if pk:
            listing = self.get_queryset(id=pk)
        else:
            listing = self.get_queryset()

        serializer = self.serializer_class(listing, many=True)
        return self.retrieve(request, *args, **kwargs)
    
    def delete(self, request,pk=None, *args, **kwargs):
        if pk:
            listing = Listing.objects.filter(pk=pk)
            if listing == None:
                return Response({
                    "message":"no listing to delete"
                })
        
            listing.delete()
            return self.destroy(request, *args, **kwargs)

