from rest_framework.test import APITestCase 
from django.urls import reverse 
from rest_framework import status 
 




# test case for agent list, profile and agent detail
class AgentTestCase(APITestCase):

    def agent_list(self):
        response = self.client.get(reverse("all_agent"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
