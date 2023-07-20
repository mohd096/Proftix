from django.urls import path
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout')
]