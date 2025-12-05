import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, 
  IonItem, IonInput, IonLabel, IonSelect, IonSelectOption, IonDatetime,
  IonModal, IonDatetimeButton, IonFooter, ModalController
} from '@ionic/angular/standalone';
import { 
  IonTextarea 
} from '@ionic/angular/standalone';

// Esta interface DEVE estar aqui e ser exportada
export interface Patient {
  id?: number | string;
  nome: string;
  cpf: string;
  inicioTerapia: string;
  status: string;
  templateId: string;
  prontuarioData: any;
  sessoes: any[];
  anotacoes?: string;
}

@Component({
  selector: 'app-patient-record-modal',
  templateUrl: './patient-record-modal.component.html',
  styleUrls: ['./patient-record-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, 
    IonItem, IonInput, IonLabel, IonSelect, IonSelectOption, IonDatetime,
    IonModal, IonDatetimeButton, IonFooter, IonTextarea
  ]
})
export class PatientRecordModalComponent implements OnInit {
  
  @Input() patient: Patient | null = null;
  @Input() mode: 'create' | 'edit' = 'create';

  formData: Patient = {
    id: '',
    nome: '',
    cpf: '',
    inicioTerapia: new Date().toISOString(),
    status: 'Ativo',
    templateId: 'default-psychological',
    prontuarioData: {},
    sessoes: []
  };

  constructor(private modalCtrl: ModalController) {}
  

  ngOnInit() {
    if (this.mode === 'edit' && this.patient) {
      this.formData = { ...this.patient };
    }
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  save() {
    if (!this.formData.nome) { return; } 
    this.modalCtrl.dismiss(this.formData, 'confirm');
  }
}