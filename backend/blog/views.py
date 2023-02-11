from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from rest_framework import mixins,generics

from .models import Blog 
from .serializers import BlogSerializer 


# blog list and create view 
class BlogListView(mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   generics.GenericAPIView):
    queryset = Blog.objects.filter(status='publish')
    serializer_class = BlogSerializer 

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


# home page blog list view 
class HomeBlogListView(mixins.ListModelMixin,
                #    mixins.CreateModelMixin,
                   generics.GenericAPIView):
    queryset = Blog.objects.filter(status='publish')[:3]
    serializer_class = BlogSerializer 

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


# blog detail, update and destroy view 
class BlogDetailView(mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.DestroyModelMixin,
                        generics.GenericAPIView):
    queryset = Blog.objects.filter(status='publish').order_by('-date')
    serializer_class = BlogSerializer 
    

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)       

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)