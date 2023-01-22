from django.urls import path
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)
from .views import TokenView

from .views import (
    SignUpView,
    ChangePassView
)


urlpatterns = [
    path('token/', TokenView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/signup/', SignUpView.as_view(), name='signup'),
    path('auth/changepassword/', ChangePassView.as_view(), name='change_pass'),    
]