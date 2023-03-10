from django.urls import path
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)
from .views import TokenView

from .views import (
    SignUpView,
)


urlpatterns = [
    path('token/', TokenView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/signup/', SignUpView.as_view(), name='signup'),
]