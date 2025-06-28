# finance/views.py

from django.db.models import Sum
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .models import Student, Invoice, Payment
from .serializers import StudentSerializer, InvoiceSerializer, PaymentSerializer

# This view is for listing all students and creating a new one
class StudentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

# This view is for retrieving, updating, or deleting a single student
class StudentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    lookup_field = 'roll_number'
    permission_classes = [IsAuthenticated]

# API endpoint to create a new invoice.
class InvoiceCreateAPIView(generics.CreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated]

# API endpoint to list all invoices for a specific student.
class StudentInvoiceListAPIView(generics.ListAPIView):
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        roll_number_from_url = self.kwargs['roll_number']
        return Invoice.objects.filter(student__roll_number=roll_number_from_url)

# API endpoint to record a new payment for an invoice.
class PaymentCreateAPIView(generics.CreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        payment = serializer.save()
        invoice = payment.invoice
        total_paid_for_invoice = Payment.objects.filter(invoice=invoice).aggregate(
            total=Sum('amount_paid')
        )['total'] or 0
        if total_paid_for_invoice >= invoice.total_amount:
            invoice.status = Invoice.StatusChoices.PAID
            invoice.save()

# This is the login view
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        if serializer.is_valid(raise_exception=True):
            validated_data = serializer.validated_data if serializer.validated_data else {}
            user = validated_data.get('user')
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'token': token.key,
                    'user_id': user.pk,
                    'email': user.email
                })
        return Response({'error': 'Invalid user data'}, status=400)