# finance/serializers.py

from rest_framework import serializers
from .models import Student, Invoice, Payment  # Imports from models.py (This is correct)

# --- Student Serializer ---
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['roll_number', 'full_name', 'course', 'semester', 'is_active']

# --- Invoice Serializer ---
class InvoiceSerializer(serializers.ModelSerializer):
    student = serializers.SlugRelatedField(
        slug_field='roll_number',
        queryset=Student.objects.all()
    )

    class Meta:
        model = Invoice
        fields = [
            'id',
            'student',
            'description',
            'total_amount',
            'due_date',
            'status',
            'created_at'
        ]
        read_only_fields = ['status', 'id', 'created_at']

# --- Payment Serializer ---

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'id',
            'invoice', # This will accept the Invoice ID
            'amount_paid',
            'payment_date',
            'mode',
            'reference_number',
            'recorded_at',
        ]
        read_only_fields = ['id', 'recorded_at']