import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonIcon, 
  IonSelect, 
  IonSelectOption 
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // 👈 Importação essencial
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';

// Interface para estruturar os dados do formulário do Cliente
interface CustomerFormData {
  name: string;
  customer_cpf: string;
  customer_gender: string;
  customer_email: string;
  customer_password: string;
  customer_phone: string;
}

@Component({
  selector: 'app-sing-up-customer',
  templateUrl: './sing-up-customer.page.html',
  styleUrls: ['./sing-up-customer.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    CommonModule, 
    FormsModule, 
    IonGrid, 
    IonRow, 
    IonCol,
    IonItem, 
    IonInput, 
    IonButton, 
    IonIcon, 
    IonSelect, 
    IonSelectOption,
    RouterLink
  ]
})
export class SingUpCustomerPage implements OnInit {
  
  formData: CustomerFormData = {
    name: '',
    customer_cpf: '',
    customer_gender: '',
    customer_email: '',
    customer_password: '',
    customer_phone: ''
  };

  // Injete o Router e o HttpClient
  constructor(private router: Router, private http: HttpClient) { 
    addIcons({ eyeOutline, eyeOffOutline });
  }

  ngOnInit() {
  }
  
  async submitForm() {
    // 🎯 Endpoint de Cadastro do Cliente
    const API_URL = 'http://127.0.0.1:8000/api/customer/';

    // Lógica de validação básica
    if (!this.formData.name || !this.formData.customer_email || !this.formData.customer_password) {
        alert('Por favor, preencha nome, email e senha.');
        return;
    }

    try {
        // Envia a requisição POST para o backend
        this.http.post(API_URL, this.formData).subscribe({
            next: (response) => {
                alert('Cadastro de Cliente realizado com sucesso! Faça login para acessar.');
                // Redireciona para a tela de login do cliente
                this.router.navigate(['/login-customer']); 
            },
            error: (error) => {
                let errorMessage = 'Erro ao cadastrar cliente. Verifique seus dados.';
                if (error.error && typeof error.error === 'object') {
                    errorMessage = 'Erro de validação: ' + JSON.stringify(error.error);
                }
                console.error('Erro no cadastro de cliente:', error);
                alert(errorMessage);
            }
        });
    } catch (error) {
        alert('Erro de conexão com o servidor. Tente novamente mais tarde.');
    }
  }
}