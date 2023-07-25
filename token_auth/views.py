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

from django.contrib.auth import login
from django.contrib.auth.models import User
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Error
from allauth.socialaccount.providers.oauth2.views import OAuth2View
from django.http import JsonResponse


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:3000/"
    client_class = OAuth2Client
    def post(self, request, *args, **kwargs):
        try:
            # Get the token sent from the React frontend
            token = request.data.get("token")
            if not token:
                return JsonResponse({"error": "Token not provided"}, status=400)

            # Authenticate the user using the token
            self.adapter_class.validate_token(token)
            user_info = self.adapter_class.get_user_info(token)
            self.adapter_class.validate_response(user_info)

            # Check if the user already exists in your database
            user, created = User.objects.get_or_create(email=user_info['email'], defaults={'username': user_info['email']})

            # Update the user's information (e.g., name) if necessary
            if created:
                user.username = user_info['username']
                user.first_name = user_info['first_name']
                user.last_name = user_info['last_name']
                user.email = user_info['email']
                user.save()

            # Log in the user using Django's login() function
            login(request, user)

            # Return a success response to the frontend
            return JsonResponse({"success": "User authenticated successfully!"}, status=200)

        except OAuth2Error as e:
            return JsonResponse({"error": str(e)}, status=400)



def email_confirm_redirect(request, key):
    return HttpResponseRedirect(
        f"{settings.EMAIL_CONFIRM_REDIRECT_BASE_URL}{key}/"
    )


def password_reset_confirm_redirect(request, uidb64, token):
    return HttpResponseRedirect(
        f"{settings.PASSWORD_RESET_CONFIRM_REDIRECT_BASE_URL}{uidb64}/{token}/"
    )


