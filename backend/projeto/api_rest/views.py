from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import User
from .serializers import UserSerializers

import json



@api_view(['GET'])
def get_users(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializers(users, many=True)
        
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def get_by_nick(request, nick):
    try:
        user = User.objects.get(pk=nick)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = UserSerializers(user)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = UserSerializers(user, data=request.data)
        
        if serializer.is_valid:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
# CRUD da massa
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def user_manager(request):
    
    # ACESSOS
    if request.method == 'GET':
        try:
            if request.GET['user']:
                user_nickname = request.GET['user']
                try:
                    user = User.objects.get(pk=user_nickname)
                except:
                    return Response(status=status.HTTP_404_NOT_FOUND)
                serializers = UserSerializers(user)
                return Response(serializers.data)
            
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    # criando dados
    if request.method == 'POST':
        new_user = request.data
        serializers = UserSerializers(data=new_user)
        
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    # editando parametros pelo request.data
    if request.method == 'PUT':
        nickname = request.data['user_nickname']
        
        try:
            update_user = User.objects.get(pk=nickname)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        print(f'Data = {request.data}')
        
        serializers = UserSerializers(update_user, data= request.data)
        
        if serializers.is_valid():
            serializers.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    # DELETAR DADOS (DELETE)
    if request.method == 'DELETE':
        try:
            user_to_delete = User.objects.get(pk=request.data['user_nickname'])
            user_to_delete.delete() # aqui ele deleta o usuario 
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)