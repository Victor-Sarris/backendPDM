import { Component, OnInit } from '@angular/core';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
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

declare var particlesJS: any

@Component({
  selector: 'app-login-professional',
  templateUrl: './login-professional.page.html',
  styleUrls: ['./login-professional.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonCheckbox,
    RouterLink,
  ],
})
export class LoginProfessionalPage implements OnInit, ViewWillEnter, ViewWillLeave {

  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    addIcons({ heart, personOutline, lockClosedOutline });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    // Um pequeno timeout garante que o HTML já renderizou o tamanho correto
    setTimeout(() => {
      this.initParticles();
    }, 100);
  }

  ionViewWillLeave() {
    const w: any = window;
    // Verifica se existe uma instância de particles rodando e a destrói
    if (w.pJSDom && w.pJSDom.length > 0) {
      // Remove o listener e limpa o canvas para não pesar a memória
      w.pJSDom[0].pJS.fn.vendors.destroypJS();
      w.pJSDom = []; // Zera o array global da biblioteca
    }
  }

  initParticles() {
    // Verifica se o elemento existe antes de tentar carregar
    const particlesDiv = document.getElementById('particles-login-professional');
    if (particlesDiv) {
      particlesJS.load('particles-login-professional', 'assets/particles.json', function () {
        console.log('✨ Particles carregadas com sucesso!');
      });
    }
  }

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