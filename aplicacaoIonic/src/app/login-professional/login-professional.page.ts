import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonCheckbox
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { heart, personOutline, lockClosedOutline } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-professional',
  templateUrl: './login-professional.page.html',
  styleUrls: ['./login-professional.page.scss'],
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
    IonCheckbox,
    RouterLink,
  ],
})
export class LoginProfessionalPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    addIcons({ heart, personOutline, lockClosedOutline });
  }

  ngOnInit() {}

  loginProfessional() {
    const loginData = {
      professional_email: this.email,
      professional_password: this.password,
    };

    const API_URL = ' https://untutelar-deloras-overreadily.ngrok-free.dev/api/professional/login/';

    if (!this.email || !this.password) {
      alert('Preencha email e senha.');
      return;
    }

    console.log('🔹 Enviando login do profissional:', loginData);

    this.http.post(API_URL, loginData).subscribe({
      next: (response: any) => {
        console.log('✅ Login bem-sucedido:', response);
        this.router.navigate(['/professional-dash-board']);
      },
      error: (error: any) => {
        console.error('❌ Erro de Login:', error);
        let message = 'Credenciais inválidas.';
        if (error.status === 400 && error.error && error.error.message) {
          message = error.error.message;
        }
        alert(message);
      },
    });
  }
}