from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Franchise, Branch, Transaction, Sale, Expense
from .serializers import FranchiseSerializer , BranchSerializer, TransactionSerializer, SaleSerializer, ExpenseSerializer
from django.http import JsonResponse
from django.db import models

# Create your views here.

def dashboard_data(request):
    # Get the total sales for each branch
    branches = Branch.objects.all()
    branch_data = []
    for branch in branches:
        total_sales = Sale.objects.filter(branch=branch).aggregate(total_sales=models.Sum('amount'))
        total_expenses = Expense.objects.filter(branch=branch).aggregate(total_expenses=models.Sum('amount'))
        profit_or_loss = (total_sales['total_sales'] or 0) - (total_expenses['total_expenses'] or 0)

        branch_data.append({
            'branch_name': branch.name,
            'total_sales': total_sales['total_sales'] or 0,
            'total_expenses': total_expenses['total_expenses'] or 0,
            'profit_or_loss': profit_or_loss
        })

    return JsonResponse(branch_data, safe=False)


class FranchiseList(ListCreateAPIView):
    queryset = Franchise.objects.all()
    serializer_class = FranchiseSerializer

class FranchiseDetail(RetrieveUpdateDestroyAPIView):
    queryset = Franchise.objects.all()
    serializer_class = FranchiseSerializer

class BranchList(ListCreateAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

class BranchDetail(RetrieveUpdateDestroyAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

class TransactionList(ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class TransactionDetail(RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class SaleList(ListCreateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

class SaleDetail(RetrieveUpdateDestroyAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

class ExpenseList(ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class ExpenseDetail(RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

