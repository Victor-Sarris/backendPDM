import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonIcon,
  IonCheckbox
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, personOutline, lockClosedOutline } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.page.html',
  styleUrls: ['./login-customer.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonIcon,
    IonCheckbox,
    RouterLink,
  ],
})
export class LoginCustomerPage implements OnInit {
  email: string = '';
  password: string = '';

  // TROCA AQUI SE UM DIA O IP MUDAR
  private readonly API_URL = ' https://untutelar-deloras-overreadily.ngrok-free.dev/api/customer/login/';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    addIcons({ heart, personOutline, lockClosedOutline });
  }

  ngOnInit() {}

  loginCustomer() {
    // validação básica
    if (!this.email.trim() || !this.password.trim()) {
      alert('Preencha email e senha.');
      return;
    }

    const loginData = {
      customer_email: this.email,
      customer_password: this.password,
    };

    console.log('📤 Enviando login de cliente:', loginData);

    this.http.post(this.API_URL, loginData).subscribe({
      next: (response: any) => {
        console.log('✅ Login de Cliente bem-sucedido:', response);
        // aqui você pode salvar o user se quiser
        // localStorage.setItem('customer', JSON.stringify(response.user));
        this.router.navigate(['/customer-dash-board']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('❌ Erro de Login de Cliente:', error);

        // status 0 = erro de rede (não chegou no servidor)
        if (error.status === 0) {
          alert(
            'Não foi possível conectar ao servidor.\n' +
            'Verifique se o backend está ligado e se o celular está na mesma rede Wi-Fi.'
          );
          return;
        }

        let message = 'Credenciais de Cliente inválidas.';
        if (error.status === 400 && error.error && (error.error as any).message) {
          message = (error.error as any).message;
        }
        alert(message);
      },
    });
  }
}