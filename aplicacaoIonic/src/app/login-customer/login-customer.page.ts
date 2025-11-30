import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // 👈 Importação essencial
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
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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
    RouterLink
],
})
export class LoginCustomerPage implements OnInit {

  email = '';
  password = '';
  
  // Injete o Router e o HttpClient
  constructor(private router: Router, private http: HttpClient) { 
    addIcons({ heart, personOutline, lockClosedOutline });
  }

  ngOnInit() {}

  async loginCustomer() {
    const loginData = {
      // ⚠️ Use os nomes de campo esperados pelo seu backend Django para o Cliente
      customer_email: this.email,
      customer_password: this.password,
    };

    // 🎯 Endpoint de Login do Cliente
    const API_URL = 'http://127.0.0.1:8000/api/customer/login/';

    // Lógica de validação simples
    if (!this.email || !this.password) {
        alert('Preencha email e senha.');
        return;
    }
    
    try {
        // Envia a requisição POST para o endpoint de login
        this.http.post(API_URL, loginData).subscribe({
            next: (response) => {
                console.log('Login de Cliente bem-sucedido:', response);
                // Redirecionamento para o Dashboard do Cliente
                this.router.navigate(['/customer-dash-board']); 
            },
            error: (error) => {
                let message = 'Credenciais de Cliente inválidas.';
                if (error.status === 400 && error.error && error.error.message) {
                    message = error.error.message;
                }
                console.error('Erro de Login de Cliente:', error);
                alert(message);
            }
        });
    } catch (error) {
        console.error('Erro de Conexão:', error);
        alert('Não foi possível conectar ao servidor. Tente novamente.');
    }
  }
}