# finance/admin.py
from django.contrib import admin
from .models import Student, Invoice, Payment

admin.site.register(Student)
admin.site.register(Invoice)
admin.site.register(Payment)
