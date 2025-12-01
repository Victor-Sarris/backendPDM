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
  IonSelectOption,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    RouterLink,
  ],
})
export class SingUpCustomerPage implements OnInit {
  formData: CustomerFormData = {
    name: '',
    customer_cpf: '',
    customer_gender: '',
    customer_email: '',
    customer_password: '',
    customer_phone: '',
  };

  // 🎯 Endpoint de Cadastro do Cliente (com IP e porta do backend)
  private readonly API_URL = ' https://untutelar-deloras-overreadily.ngrok-free.dev/api/customer/';

  constructor(private router: Router, private http: HttpClient) {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  ngOnInit() {}

  submitForm() {
    // Lógica de validação básica
    if (
      !this.formData.name.trim() ||
      !this.formData.customer_email.trim() ||
      !this.formData.customer_password.trim()
    ) {
      alert('Por favor, preencha nome, email e senha.');
      return;
    }

    console.log('📤 Enviando cadastro de cliente:', this.formData);

    this.http.post(this.API_URL, this.formData).subscribe({
      next: (response: any) => {
        console.log('✅ Cadastro de Cliente realizado:', response);
        alert('Cadastro de Cliente realizado com sucesso! Faça login para acessar.');
        this.router.navigate(['/login-customer']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('❌ Erro no cadastro de cliente:', error);

        // status 0 = erro de rede (não chegou no servidor)
        if (error.status === 0) {
          alert(
            'Não foi possível conectar ao servidor.\n' +
              'Verifique se o backend está ligado e se o celular está na mesma rede Wi-Fi.'
          );
          return;
        }

        let errorMessage = 'Erro ao cadastrar cliente. Verifique seus dados.';
        if (error.error && typeof error.error === 'object') {
          errorMessage = 'Erro de validação: ' + JSON.stringify(error.error);
        }

        alert(errorMessage);
      },
    });
  }
}