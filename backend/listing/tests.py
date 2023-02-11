from django.urls import reverse 
from rest_framework import status 
from rest_framework.test import APITestCase 
from django.contrib.auth import get_user_model 
User = get_user_model()


# listing test case 
class PostListingTestCase(APITestCase):

    # test for all listings 
    def test_listing(self):
        response = self.client.get(reverse("listing"))
        self.assertEqual(response.status_code, status.HTTP_200_OK) 


