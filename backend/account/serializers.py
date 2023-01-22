from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework import serializers 

  
# change password serializer 
class ChangePassSerializer(serializers.Serializer):
    old_password = serializers.CharField(min_length=6, required=True)
    new_password = serializers.CharField(min_length=6, required=True)
    
