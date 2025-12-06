# Arquivo: backend/projeto/api_rest/urls.py (Corrigido)
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    # Rota de administração - Removida pois o path principal já tem 'admin/'
    
    # Rotas de CRUD para Customer e Professional
    path('customer/', views.customer_manager, name='customer_manager'),
    path('professional/', views.professional_manager, name='professional_manager'),

    # Rotas de Login
    path('customer/login/', views.customer_login, name='customer_login'),
    path('professional/login/', views.professional_login, name='professional_login'),
    
    # Rota para o prontuario
    path('prontuario/', views.prontuario_manager, name='prontuario_manager'),
]