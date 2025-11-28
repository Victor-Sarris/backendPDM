import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonBadge,
  IonFooter,
  IonItem,
  IonList,
  IonAvatar,
  IonAlert,
  ModalController,
  IonMenu,
  IonLabel,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  createOutline,
  trashOutline,
  addOutline,
  eyeOutline,
  chevronBackOutline,
  chevronForwardOutline,
  searchOutline,
  gridOutline,
  peopleOutline,
  videocamOutline,
  briefcaseOutline,
  timeOutline,
  calendarOutline,
  chatbubblesOutline,
  settingsOutline,
  logOutOutline,
} from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router'; // Adicionado RouterLink

import {
  PatientRecordModalComponent,
  Patient,
} from '../components/patient-record-modal/patient-record-modal.component';

@Component({
  selector: 'app-gestaoprontuarios',
  templateUrl: './gestaoprontuarios.page.html',
  styleUrls: ['./gestaoprontuarios.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonSearchbar,
    IonButton,
    IonIcon,
    IonCard,
    IonBadge,
    IonItem,
    IonList,
    IonAvatar,
    IonAlert,
    IonMenu,
    IonLabel,
    IonRouterLink,
    RouterLink, 
  ],
})
export class GestaoprontuariosPage implements OnInit {
  isDeleteAlertOpen = false;

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.isDeleteAlertOpen = false;
      },
    },
    {
      text: 'Sim, excluir',
      role: 'confirm',
      handler: () => {
        this.confirmDelete();
      },
    },
  ];

  pacientes: Patient[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  patientToDelete: Patient | null = null;


  readonly MOCK_PACIENTES_INICIAL: Patient[] = [
    {
      id: 1,
      nome: 'Ana Paula',
      cpf: '123.456.789-00',
      inicioTerapia: '2024-03-20',
      status: 'Ativo',
      templateId: 'default-psychological',
      prontuarioData: {},
      sessoes: [],
    },
    {
      id: 2,
      nome: 'Carlos Silva',
      cpf: '987.654.321-00',
      inicioTerapia: '2023-01-15',
      status: 'Ativo',
      templateId: 'default-psychological',
      prontuarioData: {},
      sessoes: [],
    },
    {
      id: 3,
      nome: 'Bruno Lima',
      cpf: '111.222.333-44',
      inicioTerapia: '2024-06-05',
      status: 'Pendente',
      templateId: 'custom-1',
      prontuarioData: {},
      sessoes: [],
    },
    {
      id: 4,
      nome: 'Daniela Costa',
      cpf: '222.333.444-55',
      inicioTerapia: '2024-07-10',
      status: 'Ativo',
      templateId: 'default-psychological',
      prontuarioData: {},
      sessoes: [],
    },
    {
      id: 5,
      nome: 'Eduardo Reis',
      cpf: '333.444.555-66',
      inicioTerapia: '2024-08-12',
      status: 'Ativo',
      templateId: 'default-psychological',
      prontuarioData: {},
      sessoes: [],
    },
  ];

  constructor(private router: Router, private modalCtrl: ModalController) {
    addIcons({
      personOutline,
      createOutline,
      trashOutline,
      addOutline,
      eyeOutline,
      chevronBackOutline,
      chevronForwardOutline,
      searchOutline,
      gridOutline,
      peopleOutline,
      videocamOutline,
      briefcaseOutline,
      timeOutline,
      calendarOutline,
      chatbubblesOutline,
      settingsOutline,
      logOutOutline,
    });
  }

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    const dadosSalvos = localStorage.getItem('therapy_pacientes');
    if (dadosSalvos) {
      this.pacientes = JSON.parse(dadosSalvos);
    } else {
      this.pacientes = [...this.MOCK_PACIENTES_INICIAL];
      this.saveToStorage();
    }
  }

  saveToStorage() {
    localStorage.setItem('therapy_pacientes', JSON.stringify(this.pacientes));
  }

  // --- LÓGICA DO MODAL (CREATE/UPDATE) ---

  async openCreateModal() {
    const modal = await this.modalCtrl.create({
      component: PatientRecordModalComponent,
      componentProps: {
        mode: 'create',
        patient: null,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.role === 'confirm' && result.data) {
        this.createPatient(result.data);
      }
    });

    await modal.present();
  }

  async handleEdit(id?: number | string) {
    if (!id) return;

    const patientToEdit = this.pacientes.find((p) => p.id === id);
    if (!patientToEdit) return;

    const modal = await this.modalCtrl.create({
      component: PatientRecordModalComponent,
      componentProps: {
        mode: 'edit',
        patient: patientToEdit,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.role === 'confirm' && result.data) {
        this.updatePatient(result.data);
      }
    });

    await modal.present();
  }

  createPatient(newPatientData: Patient) {
    const newPatient: Patient = {
      ...newPatientData,
      id: Date.now(),
      inicioTerapia: newPatientData.inicioTerapia
        ? newPatientData.inicioTerapia.split('T')[0]
        : new Date().toISOString().split('T')[0],
    };

    this.pacientes = [newPatient, ...this.pacientes];
    this.saveToStorage();
    this.currentPage = 1;
  }

  updatePatient(updatedData: Patient) {
    const index = this.pacientes.findIndex((p) => p.id === updatedData.id);
    if (index !== -1) {
      const updatedList = [...this.pacientes];
      updatedList[index] = {
        ...updatedData,
        inicioTerapia: updatedData.inicioTerapia
          ? updatedData.inicioTerapia.split('T')[0]
          : '',
      };
      this.pacientes = updatedList;
      this.saveToStorage();
    }
  }

  // --- Lógica de Filtro e Paginação ---

  get filteredPatients() {
    if (!this.searchTerm) return this.pacientes;
    const term = this.searchTerm.toLowerCase();
    return this.pacientes.filter(
      (p) => p.nome.toLowerCase().includes(term) || p.cpf.includes(term)
    );
  }

  get paginatedPatients() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPatients.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredPatients.length / this.itemsPerPage);
  }

  get startResult() {
    if (this.filteredPatients.length === 0) return 0;
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endResult() {
    return Math.min(
      this.currentPage * this.itemsPerPage,
      this.filteredPatients.length
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  handleSearch(event: any) {
    this.searchTerm = event.detail.value;
    this.currentPage = 1;
  }

  handleView(patient: Patient) {
    console.log('Visualizar', patient);
  }

  presentDeleteAlert(patient: Patient) {
    this.patientToDelete = patient;
    this.isDeleteAlertOpen = true;
  }

  confirmDelete() {
    if (this.patientToDelete && this.patientToDelete.id) {
      this.pacientes = this.pacientes.filter(
        (p) => p.id !== this.patientToDelete!.id
      );
      this.saveToStorage();
      this.patientToDelete = null;

      if (this.paginatedPatients.length === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
    }
    this.isDeleteAlertOpen = false;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Ativo':
        return 'success';
      case 'Pendente':
        return 'warning';
      case 'Inativo':
        return 'medium';
      default:
        return 'primary';
    }
  }
}
