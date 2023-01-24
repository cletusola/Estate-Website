from django.urls import reverse 
from rest_framework import status 
from rest_framework.test import APITestCase 
from django.contrib.auth import get_user_model 
User = get_user_model()


# signup test case 
class SignUpTestCase(APITestCase):

    def test_signup(self):
        url = reverse("signup")
        data = {
            'first_name':'john',
            'last_name':'michael',
            'username':'john45',
            'email':'johnmichael@email.com',
            'password':'MyPassword23#',
            'password2':'MyPassword23#'
        }
        
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['message'],'User account created successfully')
        self.assertEqual(User.objects.get().username, 'john45')

       