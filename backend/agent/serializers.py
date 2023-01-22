from rest_framework import serializers 
from django.contrib.auth import get_user_model
User = get_user_model()

from .models import AgentProfile



# agent profile serializer 
class AgentProfileSerializer(serializers.ModelSerializer):
    picture = serializers.FileField(required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    username = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    class Meta:
        model = AgentProfile
        fields = '__all__'

# user serializer 
class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    username = serializers.CharField(required=False)
    email = serializers.CharField(required=False)

    class Meta:
        model = User 
        fields = ['first_name','last_name','username','email']


