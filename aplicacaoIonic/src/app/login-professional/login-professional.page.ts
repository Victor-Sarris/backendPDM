import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import {
  IonContent, // Estava faltando
  IonGrid,
  IonRow,
  IonCol,
  IonItem, // Estava faltando
  IonInput, // Estava faltando
  IonButton, // Estava faltando
  IonIcon, // Estava faltando
  IonCheckbox // Estava faltando
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, personOutline, lockClosedOutline } from 'ionicons/icons';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-login-professional',
  templateUrl: './login-professional.page.html',
  styleUrls: ['./login-professional.page.scss'],
  standalone: true,
  imports: [
    IonContent, // ✅ Adicionado
    CommonModule,
    FormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonItem, // ✅ Adicionado
    IonInput, // ✅ Adicionado
    IonButton, // ✅ Adicionado
    IonIcon, // ✅ Adicionado
    IonCheckbox, // ✅ Adicionado
    RouterLink
  ],
})
export class LoginProfessionalPage implements OnInit {

  email = '';
  password = '';

  // Injete o Router e o HttpClient
  constructor(private router: Router, private http: HttpClient) {
    addIcons({ heart, personOutline, lockClosedOutline });
  }

  ngOnInit() { }

  async loginProfessional() {
    const loginData = {
      professional_email: this.email,
      professional_password: this.password,
    };

    const API_URL = 'http://127.0.0.1:8000/api/professional/login/';

    // 💡 Lógica de validação simples
    if (!this.email || !this.password) {
      alert('Preencha email e senha.');
      return;
    }

    try {
      // Envia a requisição POST para o endpoint de login
      this.http.post(API_URL, loginData).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido:', response);
          // 🎯 Redirecionamento para o Dashboard do Profissional
          this.router.navigate(['/professional-dash-board']);
        },
        error: (error) => {
          let message = 'Credenciais inválidas.';
          if (error.status === 400 && error.error && error.error.message) {
            message = error.error.message;
          }
          console.error('Erro de Login:', error);
          alert(message);
        }
      });
    } catch (error) {
      console.error('Erro de Conexão:', error);
      alert('Não foi possível conectar ao servidor. Tente novamente.');
    }
  }
}