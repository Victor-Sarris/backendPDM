import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
  IonGrid, IonRow, IonCol, IonSearchbar, IonButton, IonIcon, IonCard,
  IonBadge, IonItem, IonList, IonAvatar, IonAlert, ModalController,
  IonMenu, IonLabel, IonRouterLink, LoadingController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline, createOutline, trashOutline, addOutline, eyeOutline,
  chevronBackOutline, chevronForwardOutline, searchOutline, gridOutline,
  peopleOutline, videocamOutline, briefcaseOutline, timeOutline,
  calendarOutline, chatbubblesOutline, settingsOutline, logOutOutline
} from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // IMPORTANTE
import { PatientRecordModalComponent, Patient } from '../components/patient-record-modal/patient-record-modal.component';

@Component({
  selector: 'app-gestaoprontuarios',
  templateUrl: './gestaoprontuarios.page.html',
  styleUrls: ['./gestaoprontuarios.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonMenuButton, IonSearchbar, IonButton, IonIcon, IonCard,
    IonBadge, IonItem, IonList, IonAvatar, IonAlert, IonMenu, IonLabel,
    IonRouterLink, RouterLink,
  ],
})
export class GestaoprontuariosPage implements OnInit {
  
  // Defina a URL da sua API aqui
  private readonly API_URL = 'https://untutelar-deloras-overreadily.ngrok-free.dev/api/prontuario/';

  pacientes: Patient[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  isDeleteAlertOpen = false;
  patientToDelete: Patient | null = null;

  public alertButtons = [
    { text: 'Cancelar', role: 'cancel', handler: () => { this.isDeleteAlertOpen = false; } },
    { text: 'Sim, excluir', role: 'confirm', handler: () => { this.confirmDelete(); } },
  ];

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    addIcons({
      personOutline, createOutline, trashOutline, addOutline, eyeOutline,
      chevronBackOutline, chevronForwardOutline, searchOutline, gridOutline,
      peopleOutline, videocamOutline, briefcaseOutline, timeOutline,
      calendarOutline, chatbubblesOutline, settingsOutline, logOutOutline,
    });
  }

  ngOnInit() {
    this.loadPatients();
  }

  // --- CRUD COM A API ---

  async loadPatients() {
    const loading = await this.loadingCtrl.create({ message: 'Carregando...' });
    await loading.present();

    this.http.get<any[]>(this.API_URL).subscribe({
      next: (data) => {
        // Mapeia os dados do backend (snake_case) para o frontend se necessário
        this.pacientes = data.map(item => ({
          id: item.id,
          nome: item.nome,
          cpf: item.cpf,
          status: item.status,
          inicioTerapia: item.inicio_terapia, // Backend usa inicio_terapia
          anotacoes: item.anotacoes,
          templateId: 'default',
          prontuarioData: {},
          sessoes: []
        }));
        loading.dismiss();
      },
      error: (err) => {
        console.error(err);
        loading.dismiss();
        this.showToast('Erro ao carregar prontuários.');
      }
    });
  }

  createPatient(patientData: Patient) {
    // Prepara o objeto para o Backend
    const payload = {
      nome: patientData.nome,
      cpf: patientData.cpf,
      status: patientData.status,
      inicio_terapia: patientData.inicioTerapia ? patientData.inicioTerapia.split('T')[0] : null,
      anotacoes: patientData.anotacoes
    };

    this.http.post(this.API_URL, payload).subscribe({
      next: () => {
        this.showToast('Prontuário criado com sucesso!');
        this.loadPatients(); // Recarrega a lista
        this.currentPage = 1;
      },
      error: (err) => {
        console.error(err);
        this.showToast('Erro ao criar prontuário.');
      }
    });
  }

  updatePatient(patientData: Patient) {
    const payload = {
      id: patientData.id,
      nome: patientData.nome,
      cpf: patientData.cpf,
      status: patientData.status,
      inicio_terapia: patientData.inicioTerapia ? patientData.inicioTerapia.split('T')[0] : null,
      anotacoes: patientData.anotacoes
    };

    this.http.put(this.API_URL, payload).subscribe({
      next: () => {
        this.showToast('Prontuário atualizado!');
        this.loadPatients();
      },
      error: (err) => {
        console.error(err);
        this.showToast('Erro ao atualizar.');
      }
    });
  }

  confirmDelete() {
    if (this.patientToDelete && this.patientToDelete.id) {
      // Passando ID via query param ou body, dependendo da sua view.
      // Na view que fiz acima, ela aceita query param também (?id=...)
      const urlWithId = `${this.API_URL}?id=${this.patientToDelete.id}`;
      
      this.http.delete(urlWithId).subscribe({
        next: () => {
          this.showToast('Prontuário excluído.');
          this.loadPatients();
          this.isDeleteAlertOpen = false;
          this.patientToDelete = null;
        },
        error: (err) => {
          console.error(err);
          this.showToast('Erro ao excluir.');
          this.isDeleteAlertOpen = false;
        }
      });
    }
  }

  // --- Lógica de UI (Modais e Paginação) ---

  async openCreateModal() {
    const modal = await this.modalCtrl.create({
      component: PatientRecordModalComponent,
      componentProps: { mode: 'create', patient: null },
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
      componentProps: { mode: 'edit', patient: patientToEdit },
    });

    modal.onDidDismiss().then((result) => {
      if (result.role === 'confirm' && result.data) {
        this.updatePatient(result.data);
      }
    });
    await modal.present();
  }

  presentDeleteAlert(patient: Patient) {
    this.patientToDelete = patient;
    this.isDeleteAlertOpen = true;
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }

  // Getters para paginação e busca
  get filteredPatients() {
    if (!this.searchTerm) return this.pacientes;
    const term = this.searchTerm.toLowerCase();
    return this.pacientes.filter(
      (p) => p.nome.toLowerCase().includes(term) || p.cpf.includes(term)
    );
  }

  get paginatedPatients() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPatients.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredPatients.length / this.itemsPerPage);
  }

  get startResult() {
    if (this.filteredPatients.length === 0) return 0;
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endResult() {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredPatients.length);
  }

  nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }
  prevPage() { if (this.currentPage > 1) this.currentPage--; }
  
  handleSearch(event: any) {
    this.searchTerm = event.detail.value;
    this.currentPage = 1;
  }

  handleView(patient: Patient) {
    // Você pode criar um modal de visualização ou alert com as anotações
    this.showToast(`Anotações: ${patient.anotacoes || 'Nenhuma'}`);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Ativo': return 'success';
      case 'Pendente': return 'warning';
      case 'Inativo': return 'medium';
      default: return 'primary';
    }
  }
}