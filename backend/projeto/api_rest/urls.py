from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/customer/', views.customer_manager, name='customer_manager'),
    path('api/professional/', views.professional_manager, name='professional_manager')
]