from django.contrib import admin
from django.urls import path
from .views import FranchiseList, FranchiseDetail, BranchList, BranchDetail, TransactionList, TransactionDetail, SaleList, SaleDetail, ExpenseList, ExpenseDetail, dashboard_data
urlpatterns = [
    path('api/franchises/', FranchiseList.as_view()),
    path('api/franchises/<pk>/', FranchiseDetail.as_view()),
    path('api/branches/', BranchList.as_view()),
    path('api/branches/<pk>/', BranchDetail.as_view()),
    path('api/transactions/', TransactionList.as_view()),
    path('api/transactions/<pk>/', TransactionDetail.as_view()),
    path('api/sales/', SaleList.as_view()),
    path('api/sales/<pk>/', SaleDetail.as_view()),
    path('api/expenses/', ExpenseList.as_view()),
    path('api/expenses/<pk>/', ExpenseDetail.as_view()),
    path('api/dashboard_data/', dashboard_data, name='dashboard_data'),
]