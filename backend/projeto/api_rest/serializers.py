from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from .models import Customer, Professional

class CustomerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    email = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    class Meta:
        model = Customer
        fields = '__all__'
        
    def create(self, validated_data):
        user_data = {
            'username': validated_data.pop('username'),
            'email': validated_data.pop('email'),
            'password': validated_data.pop('password'),
        }
        
        user = User.objects.create_user(**user_data)
        customer = Customer.objects.create(user=user, **validated_data)
        
        Token.objects.create(user=user)
        
        return customer
        
class ProfessionalSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    email = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    class Meta:
        model = Professional
        fields = '__all__'
    
    def create(self, validated_data):
        user_data = {
            'username': validated_data.pop('username'),
            'email': validated_data.pop('email'),
            'password': validated_data.pop('password'),
        }
        
        user = User.objects.create_user(**user_data)
        professional = Professional.objects.create(user=user, **validated_data)
        
        Token.objects.create(user=user)
        
        return professional