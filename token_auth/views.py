# from django.shortcuts import render, redirect
# from dj_rest_auth.registration.views import RegisterView
# from dj_rest_auth.views import LoginView , LogoutView
# from django.contrib.auth.models import User
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt

# def registration_view(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         email = request.POST.get('email')
#         password = request.POST.get('password')

#         # Check if the username or email already exists
#         if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
#             return JsonResponse({'error': 'Username or email already exists'}, status=400)

#         # Create the user
#         user = User.objects.create_user(username=username, email=email, password=password)
#         return JsonResponse({'message': 'Registration successful'})

#     return JsonResponse({'error': 'Invalid request method'}, status=405)

# def login_view(request):
#     if request.method == 'POST':
#         return LoginView.as_view()(request)
#     return render(request, 'login.html')

# class LogoutView(LogoutView):
#     def get(self, request, *args, **kwargs):
#         return redirect('login')
    
# from django.shortcuts import render, redirect
# from django.contrib.auth.models import User
# from django.contrib import messages
# from django.contrib.auth import authenticate, login, logout

# # Create your views here.

# def home(request):
#     return render(request, 'authentication/index.html')

# def register(request):
#     if request.method == 'POST':
#         username = request.POST['username']
#         fname = request.POST['fname']
#         lname = request.POST['lname']
#         email = request.POST['email']
#         pass1 = request.POST['pass1']
#         pass2 = request.POST['pass2']

#         myuser = User.objects.create_user(username, email, pass1)
#         myuser.first_name = fname
#         myuser.last_name = lname

#         myuser.save()

#         messages.success(request, "Your account has been successfully created")

#         return redirect('api/login')

#     return render(request, 'authentication/registration.html')


# def login(request):

#     if request.method == 'POST':
#         username = request.POST['username']
#         pass1 = request.POST['pass1']

#         user = authenticate(username=username, password=pass1)

#         if user is not None:
#             login(request, user)
#             fname = user.first_name
#             # messages.success(request, "You have successfully logged in")
#             return render(request, 'authentication/index.html', {'fname': fname})
#         else:
#             messages.error(request, "Invalid credentials, please try again")
#             return redirect('home')

#     return render(request, 'authentication/login.html')

# def logout(request):
#     logout(request)
#     messages.success(request, "You have successfully logged out")
#     return redirect('api/')



from django.conf import settings
from django.http import HttpResponseRedirect
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView, PasswordResetView, PasswordResetConfirmView, PasswordChangeView
from allauth.socialaccount.views import signup
from .serializers import UserDetailsSerializer
from rest_framework import status
from rest_framework.response import Response



class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:3000/"
    client_class = OAuth2Client

def email_confirm_redirect(request, key):
    return HttpResponseRedirect(
        f"{settings.EMAIL_CONFIRM_REDIRECT_BASE_URL}{key}/"
    )


def password_reset_confirm_redirect(request, uidb64, token):
    return HttpResponseRedirect(
        f"{settings.PASSWORD_RESET_CONFIRM_REDIRECT_BASE_URL}{uidb64}/{token}/"
    )

class CustomRegisterView(RegisterView):
    def get_response_data(self, user):
        return {
            "user": UserDetailsSerializer(user, context=self.get_serializer_context()).data
        }
    
class CustomLoginView(LoginView):
    def get_response_data(self, user):
        return {
            "user": UserDetailsSerializer(user, context=self.get_serializer_context()).data
        }
    
class CustomLogoutView(LogoutView):
    def get_response(self):
        return Response({"detail": ("Successfully logged out.")},
                        status=status.HTTP_200_OK)
    
class CustomUserDetailsView(UserDetailsView):
    def get_response_data(self, user):
        return {
            "user": UserDetailsSerializer(user, context=self.get_serializer_context()).data
        }
    
class CustomPasswordResetView(PasswordResetView):
    def get_response(self):
        return Response({"detail": ("Password reset e-mail has been sent.")},
                        status=status.HTTP_200_OK)
    
class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    def get_response(self):
        return Response({"detail": ("Password has been reset with the new password.")},
                        status=status.HTTP_200_OK)
    
class CustomPasswordChangeView(PasswordChangeView):
    def get_response(self):
        return Response({"detail": ("New password has been saved.")},
                        status=status.HTTP_200_OK)
    

    
