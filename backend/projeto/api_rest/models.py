from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length =100, default='')
    customer_cpf = models.CharField(primary_key=True, max_length=11, default='')
    customer_gender = models.CharField(max_length=20, default='')
    customer_email = models.CharField(max_length=50, default='')
    customer_password = models.CharField(max_length=128, default='')
    customer_phone = models.CharField(max_length=11, default='')
    
    def __str__(self):
        return f'Name: {self.name}, CPF: {self.customer_cpf}, Gender: {self.customer_gender}, Email: {self.customer_email}, Phone: {self.customer_phone}'
    
class Professional(models.Model):
    name = models.CharField(max_length =100, default='')
    professional_cpf = models.CharField(max_length=11, default='')
    professional_gender = models.CharField(max_length=20, default='')
    professional_email = models.CharField(max_length=50, default='')
    professional_password = models.CharField(max_length=128, default='')
    professional_phone = models.CharField(max_length=11, default='')
    crp = models.CharField(max_length=7, default='')
    specialty = models.CharField(max_length=50, default='', blank=True)
    abordagem = models.CharField(max_length=20, default='')
    descricao = models.CharField(max_length=300, default='')
    
    def __str__(self):
        return f'Name: {self.name}, CPF: {self.professional_cpf}, Gender:{self.professional_gender}, Email: {self.professional_email}, Phone: {self.professional_phone}, CRP: {self.crp}, Specialty: {self.specialty}, Abordagem: {self.abordagem}, Descricao: {self.descricao}'