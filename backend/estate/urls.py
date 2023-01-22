from django.contrib import admin
from django.urls import path,include
from django.conf import settings 
from django.conf.urls.static import static 



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/account/', include('account.urls')),
    path('api/agent/', include('agent.urls')),
    path('api/listing/', include('listing.urls')),
    path('api/blog/', include('blog.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
urlpatterns += static(settings.MEDIA_URL,
                            document_root = settings.MEDIA_ROOT)