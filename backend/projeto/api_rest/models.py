from django.db import models

class Customer(models.Model):
    # Deixe o Django criar o 'id' automaticamente
    name = models.CharField(max_length=100)
    customer_cpf = models.CharField(max_length=11, unique=True) # unique=True evita duplicatas
    customer_gender = models.CharField(max_length=20, blank=True)
    customer_email = models.EmailField(max_length=50, unique=True) # EmailField valida o formato
    customer_password = models.CharField(max_length=128)
    customer_phone = models.CharField(max_length=11)

    def __str__(self):
        return f'{self.name} ({self.customer_cpf})'

class Professional(models.Model):
    name = models.CharField(max_length=100)
    professional_cpf = models.CharField(max_length=11, unique=True)
    professional_gender = models.CharField(max_length=20, blank=True)
    professional_email = models.EmailField(max_length=50, unique=True)
    professional_password = models.CharField(max_length=128)
    professional_phone = models.CharField(max_length=11)
    crp = models.CharField(max_length=7)
    specialty = models.CharField(max_length=50, blank=True)
    abordagem = models.CharField(max_length=20, blank=True)
    descricao = models.TextField(max_length=300, blank=True) # TextField é melhor para descrições

    def __str__(self):
        return f'Dr(a). {self.name} - CRP: {self.crp}'

class Prontuario(models.Model):
    # ✅ Adicionado blank=True para permitir que o campo venha vazio se necessário
    nome = models.CharField(max_length=100, default='', blank=True)
    
    # ✅ Adicionado blank=True e padronizado para 14 caracteres (formato com pontuação) ou 11 (apenas números)
    cpf = models.CharField(max_length=14, default='', blank=True)
    
    status = models.CharField(max_length=50, default='Ativo', blank=True)
    inicio_terapia = models.DateField(null=True, blank=True)
    
    # ✅ CORREÇÃO CRÍTICA: Mudado para TextField (não precisa de limite e aceita textos longos)
    anotacoes = models.TextField(blank=True, default='')

    def __str__(self):
        return f'Paciente {self.nome}, Status: {self.status}'