from django.db import models

# Create your models here.
class Franchise(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    website = models.CharField(max_length=100)
    logo = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """A string representation of the model."""
        return f'{self.name}'

    class Meta:
        db_table = "franchise"



class Branch(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    website = models.CharField(max_length=100)
    logo = models.CharField(max_length=400)
    franchise = models.ForeignKey(Franchise, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """A string representation of the model."""
        return f'{self.name}'

    class Meta:
        db_table = "branch"


class Transaction(models.Model):
    TRANSACTION_TYPE = (
        ('Sale', 'Sale'),
        ('Expense', 'Expense'),
    )
    transaction_type = models.CharField(max_length=100, choices=TRANSACTION_TYPE)
    date = models.DateField()
    amount = models.FloatField()
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """A string representation of the model."""
        return f'{self.transaction_type}'
    
    class Meta:
        db_table = "transaction"

class Sale(models.Model):
    date = models.DateField()
    amount = models.FloatField()
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """A string representation of the model."""
        return f'{self.amount} from {self.branch.name}'
    
    class Meta:
        db_table = "sale"

class Expense(models.Model):
    date = models.DateField()
    amount = models.FloatField()
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """A string representation of the model."""
        return f'{self.amount} from {self.branch.name}'
    
    class Meta:
        db_table = "expense"



class ProfitAndLoss(models.Model):
    date = models.DateField()
    total_sales = models.FloatField()
    total_expenses = models.FloatField()
    profit_or_loss = models.FloatField()
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """A string representation of the model."""
        return f'{self.profit_or_loss} from {self.branch.name}'
    
    class Meta:
        db_table = "profit_and_loss"

