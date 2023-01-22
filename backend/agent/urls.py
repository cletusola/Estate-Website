from django.urls import path
from django.conf import settings 
from django.conf.urls.static import static 

from .signals import *
from .views import (
    AgentView,
    AgentHomePageView,
    AgentDetailView,
    AgentProfileView,
    UpdateProfileView,
    UserView,
    )

urlpatterns = [

    path('', AgentView.as_view(), name="all_agents"),
    path('home_display/', AgentHomePageView.as_view(), name="all_agents"),
    path('<int:id>/', AgentDetailView.as_view()),
    path('user/', UserView.as_view(), name="user"),
    path('user/<int:pk>/', UserView.as_view(), name="user_detail"),
    path('profile/update/', UpdateProfileView.as_view()),
    path('profile/update/<int:pk>/', UpdateProfileView.as_view()),
    path('allagents/<username>/', AgentProfileView.as_view(), name="agent_search"),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                            document_root = settings.MEDIA_ROOT)