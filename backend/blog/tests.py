from rest_framework.test import APITestCase 
from django.urls import reverse 
from rest_framework import status 





# test case for blog list and detailview 
class BlogTestCase(APITestCase):
    
    # blog list 
    def blog_list(self):
        response = self.client.get(reverse("blogs"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # blog details 
    def blog_detail(self):
        response =  self.client.get(reverse("blog_details"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # home display 
    def home_blog(self):
        response =  self.client.get(reverse("home_blogs"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
         
