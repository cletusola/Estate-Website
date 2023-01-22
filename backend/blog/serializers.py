from rest_framework import serializers 

from .models import Blog 


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog 
        fields = ['id','title','excerpt','slug','image','content','written_by','date']
