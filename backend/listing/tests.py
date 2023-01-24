from django.urls import reverse 
from rest_framework import status 
from rest_framework.test import APITestCase 
from django.contrib.auth import get_user_model 
User = get_user_model()


# listing test case 
class PostListing(APITestCase):

    def test_listing(self):
        url = reverse("listing")
        data = {
            'name':'Test Villa',
            'address':'12 abc ln, abcd',
            'price':'100000',
            'area':'123',
            'bed':'3',
            'bath':'3',
            'garage':'3',
            'description': 'villa description',
            'image1':'image1.jpg',
            'image2':'image2.jpg',
            'image3':'image3.jpg',
        }
        
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data["message"],"cannot submit form")

       
