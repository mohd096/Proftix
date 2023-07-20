from django.contrib import admin
from .models import Franchise, Branch, Transaction, Sale, Expense
# Register your models here.

admin.site.register(Franchise)
admin.site.register(Branch)
admin.site.register(Transaction)
admin.site.register(Sale)
admin.site.register(Expense)
