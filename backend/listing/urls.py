from django.urls import path
from django.conf import settings 
from django.conf.urls.static import static 

from .views import( 
ListingView,
AgentList,
AgentListDetails,
ListingDetials,
HomeListingView)
urlpatterns = [
    path('', ListingView.as_view(), name="listing"),
    path('<int:pk>/', ListingDetials.as_view(), name="listing_details"),
    path('agent_list/', AgentList.as_view(), name="agent_list"),
    path('agent_list/<int:pk>/', AgentListDetails.as_view(), name="agent_list"),
    path('home_display/', HomeListingView.as_view(), name="listing"),
]
urlpatterns += static(settings.MEDIA_URL,
                            document_root = settings.MEDIA_ROOT)
