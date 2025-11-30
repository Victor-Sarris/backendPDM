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
  IonTextarea,
  IonCheckbox
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router'; // Importar Router
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';

interface ProfessionalFormData {
  name: string;
  professional_cpf: string;
  professional_gender: string;
  professional_email: string;
  professional_password: string;
  professional_phone: string;
  crp: string;
  specialty: string;
  abordagem: string;
  descricao: string;
}

@Component({
  selector: 'app-sing-up-professional',
  templateUrl: './sing-up-professional.page.html',
  styleUrls: ['./sing-up-professional.page.scss'],
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
    IonTextarea,
    IonCheckbox,
    RouterLink
  ]
})
export class SingUpProfessionalPage implements OnInit {

  formData: ProfessionalFormData = {
    name: '',
    professional_cpf: '',
    professional_gender: '',
    professional_email: '',
    professional_password: '',
    professional_phone: '',
    crp: '',
    specialty: 'Psicólogo(a)',
    abordagem: '',
    descricao: ''
  };

  // Injete o Router e o HttpClient
  constructor(private router: Router, private http: HttpClient) {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  ngOnInit() {
  }

  setSpecialty(specialty: string) {
    this.formData.specialty = specialty;
    console.log('Especialidade definida como:', this.formData.specialty);
  }

  async submitForm() {
    const API_URL = 'http://127.0.0.1:8000/api/professional/';

    // 💡 Lógica de validação básica (aprimore no futuro)
    if (!this.formData.name || !this.formData.professional_password || !this.formData.crp) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // Envia a requisição POST para o backend
      this.http.post(API_URL, this.formData).subscribe({
        next: (response) => {
          alert('Cadastro realizado com sucesso! Faça login para acessar.');
          // Redireciona para a tela de login do profissional
          this.router.navigate(['/login-professional']);
        },
        error: (error) => {
          let errorMessage = 'Erro ao cadastrar. Verifique seus dados.';
          if (error.error && typeof error.error === 'object') {
            errorMessage = 'Erro de validação: ' + JSON.stringify(error.error);
          }
          console.error('Erro no cadastro:', error);
          alert(errorMessage);
        }
      });
    } catch (error) {
      alert('Erro de conexão com o servidor. Tente novamente mais tarde.');
    }
  }
}