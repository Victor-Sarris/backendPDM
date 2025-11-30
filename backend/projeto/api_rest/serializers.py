from rest_framework import serializers
from .models import Customer, Professional
from django.contrib.auth.hashers import make_password 

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
    
    def create(self, validated_data):
        if 'customer_password' in validated_data:
            validated_data['customer_password'] = make_password(validated_data['customer_password'])
        return super().create(validated_data)
        
class ProfessionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professional
        fields = '__all__'

    def create(self, validated_data):
        if 'professional_password' in validated_data:
            validated_data['professional_password'] = make_password(validated_data['professional_password'])
        return super().create(validated_data)