from django.urls import path
from django.conf import settings 
from django.conf.urls.static import static 

from .views import BlogListView,BlogDetailView,HomeBlogListView

urlpatterns = [
    
    path('', BlogListView.as_view(), name="blogs"),
    path('home_display/', HomeBlogListView.as_view(), name="home_blogs"),
    path('<int:pk>/', BlogDetailView.as_view(), name="blog_details"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                            document_root = settings.MEDIA_ROOT)