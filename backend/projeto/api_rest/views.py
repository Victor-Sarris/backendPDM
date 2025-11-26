from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Customer, Professional
from .serializers import CustomerSerializer, ProfessionalSerializer

import json


# ----------------------- API VIEW PARA O CLIENTE -----------------------
@api_view(['GET'])
def get_customer(request):
    if request.method == 'GET':
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def get_customer_by_cpf(request, cpf):
    try:
        customer = Customer.objects.get(pk=cpf)
    except: 
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = CustomerSerializer(customer, data=request.data)
        
        if serializer.is_valid:
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
# CRUD DO CLIENTE

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def customer_manager(request):
    
    # Acessos
    if request.method == 'GET':
        try:
            if request.GET['customer']:
                customer_name = request.GET['customer']
                try:
                   customer = Customer.objects.get(customer_name)
                except:
                   return Response(status=status.HTTP_404_NOT_FOUND)
                serializers = CustomerSerializer(customer)
                return Response(serializers.data)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
    # criando um novo cliente
    if request.method == 'POST':
        new_customer = request.data
        serializers = CustomerSerializer(data=new_customer)
        
        if serializers.is_valid():
            serializers.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    # editando os dados de um cliente
    if request.method == 'PUT':
        customer_cpf = request.data['customer_cpf']
        try:
            update_costumer = Customer.objects.get(pk=customer_cpf)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        print(f'Data = {request.data}')
        
        serializers = CustomerSerializer(update_costumer, data=request.data)
        
        if serializers.is_valid():
            serializers.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    # Deletar dados do cliente
    if request.method == 'DELETE':
        try: 
            customer_to_delete = Customer.objects.get(pk=request.data['customer_cpf'])
            customer_to_delete.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        


# ----------------------- API VIEW PARA O PROFISSIONAL -----------------------

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def professional_manager(request):
    # Acessos (GET)
    if request.method == 'GET':
        try:
            if request.GET.get('professional'): 
                professional_cpf = request.GET['professional']
                try:
                   professional = Professional.objects.get(pk=professional_cpf)
                   serializer = ProfessionalSerializer(professional)
                   return Response(serializer.data)
                except Professional.DoesNotExist:
                   return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                professionals = Professional.objects.all()
                serializer = ProfessionalSerializer(professionals, many=True)
                return Response(serializer.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
    # Criando um novo profissional (POST)
    if request.method == 'POST':
        new_professional = request.data
        serializer = ProfessionalSerializer(data=new_professional)
        
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Editando dados do profissional (PUT))
    if request.method == 'PUT':
        professional_cpf = request.data['professional_cpf']
        try:
            update_professional = Professional.objects.get(pk=professional_cpf)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        print(f'Data = {request.data}')
        
        serializer = ProfessionalSerializer(update_professional, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    # Deletar dados do profissional
    if request.method == 'DELETE':
        try:
            professional_to_delete = Professional.objects.get(pk=request.data['professional_cpf'])
            professional_to_delete.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)