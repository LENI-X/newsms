# finance/models.py
from django.db import models
from django.utils import timezone

class Student(models.Model):
    roll_number = models.CharField(max_length=20, unique=True, primary_key=True)
    full_name = models.CharField(max_length=100)
    course = models.CharField(max_length=100)
    semester = models.IntegerField()
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.full_name} ({self.roll_number})"

class Invoice(models.Model):
    class StatusChoices(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        PAID = 'PAID', 'Paid'
        OVERDUE = 'OVERDUE', 'Overdue'

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='invoices')
    description = models.CharField(max_length=200) # e.g., "Tuition Fee - 3rd Semester"
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateField()
    status = models.CharField(max_length=10, choices=StatusChoices.choices, default=StatusChoices.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Invoice #{self.id} for {self.student.full_name} - {self.status}"

class Payment(models.Model):
    class PaymentMode(models.TextChoices):
        CASH = 'CASH', 'Cash'
        BANK_TRANSFER = 'BANK', 'Bank Transfer'
        CHEQUE = 'CHEQUE', 'Cheque'
        DD = 'DD', 'Demand Draft'

    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='payments')
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField()
    mode = models.CharField(max_length=10, choices=PaymentMode.choices)
    reference_number = models.CharField(max_length=100, blank=True, null=True) # For cheque or transaction ID
    recorded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment of {self.amount_paid} for Invoice #{self.invoice.id}"