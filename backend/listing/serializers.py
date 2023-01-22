from rest_framework import serializers 
from django.contrib.auth import get_user_model
User = get_user_model()

from .models import Listing 


# listing serializer 
class ListingSerializer(serializers.ModelSerializer):
    agent = serializers.CharField(required=False)
    image4 = serializers.FileField(required=False)
    image5= serializers.FileField(required=False)
    image6 = serializers.FileField(required=False)
    image7 = serializers.FileField(required=False)
    image8 = serializers.FileField(required=False)
    image9 = serializers.FileField(required=False)
    image10 = serializers.FileField(required=False)

    class Meta:
        model = Listing
        fields = ['id','name','contract_type','price','address','bath',
                'bed','area','garage','description','agent','image1',
                'image2','image3','image4','image5','image6','image7',
                'image8','image9','image10','date']
