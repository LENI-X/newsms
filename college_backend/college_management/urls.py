# college_management/urls.py
from django.contrib import admin
from django.urls import path, include # Make sure to import 'include'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('finance.urls')), # Add this line
]