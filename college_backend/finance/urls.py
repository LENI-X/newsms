# finance/urls.py

from django.urls import path
from .views import (
    CustomAuthToken,              # Make sure this is imported
    StudentListCreateAPIView,
    StudentDetailAPIView,
    InvoiceCreateAPIView,
    StudentInvoiceListAPIView,
    PaymentCreateAPIView
)

urlpatterns = [
    # --- THIS IS THE MISSING LINE ---
    path('login/', CustomAuthToken.as_view(), name='api_token_auth'),

    # Student URLs
    path('students/', StudentListCreateAPIView.as_view(), name='student-list-create'),
    path('students/<str:roll_number>/', StudentDetailAPIView.as_view(), name='student-detail'),
    path('students/<str:roll_number>/invoices/', StudentInvoiceListAPIView.as_view(), name='student-invoice-list'),

    # Invoice URL
    path('invoices/', InvoiceCreateAPIView.as_view(), name='invoice-create'),

    # Payment URL
    path('payments/', PaymentCreateAPIView.as_view(), name='payment-create'),
]