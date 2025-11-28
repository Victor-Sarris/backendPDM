import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonCard,
  IonAvatar,
  IonBadge,
  IonChip,
  IonModal,
  IonFooter,
  IonApp,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  star,
  closeCircleOutline,
  arrowForward,
  filter,
  locationOutline,
  peopleOutline,
  videocamOutline,
  timeOutline,
  calendarOutline,
  chatbubblesOutline,
  settingsOutline,
  logOutOutline,
} from 'ionicons/icons';

interface Specialist {
  id: number;
  name: string;
  title: string;
  image: string;
  reviews: number;
  crp: string;
  price: number;
  location: string;
  isNew: boolean;
  description: string;
  topics: string[];
  schedule: { day: string; date: string; times: string[] }[];
}

@Component({
  selector: 'app-customer-dash-board',
  templateUrl: './customer-dash-board.page.html',
  styleUrls: ['./customer-dash-board.page.scss'],
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
    IonGrid,
    IonRow,
    IonCol,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonCard,
    IonAvatar,
    IonBadge,
    IonChip,
    IonModal,
    IonMenu,
    IonList,
    IonItem,
    IonLabel,
    RouterLink,
  ],
})
export class CustomerDashBoardPage implements OnInit {
  searchTerm = '';
  filterSpecialty = '';
  filterLocation = '';

  // Controle do Modal
  isModalOpen = false;
  selectedSpec: Specialist | null = null;

  // Dados Mockados (Baseado no seu HTML original)
  specialists: Specialist[] = [
    {
      id: 1,
      name: 'Seline Melo',
      title: 'Psicóloga, Psicanalista',
      image: 'https://randomuser.me/api/portraits/women/48.jpg',
      reviews: 50,
      crp: '05/30054',
      price: 160,
      location: 'Floriano - PI',
      isNew: true,
      description:
        'Através da experiência pessoal e profissional afirmo que é possível transformar-se através do autoconhecimento.',
      topics: ['Ansiedade', 'TOC', 'Autoconhecimento', 'TDAH'],
      schedule: [
        { day: 'Hoje', date: '4 Fev', times: [] },
        { day: 'Amanhã', date: '5 Fev', times: ['07:05', '13:15'] },
        { day: 'Sex', date: '6 Fev', times: ['08:45', '15:15'] },
        { day: 'Sáb', date: '7 Fev', times: ['09:55'] },
      ],
    },
    {
      id: 2,
      name: 'Felipe Sousa',
      title: 'Psicólogo Comportamental',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      reviews: 32,
      crp: '05/12345',
      price: 150,
      location: 'Teresina - PI',
      isNew: false,
      description:
        'Especialista em Terapia Cognitivo Comportamental com foco em ansiedade e depressão.',
      topics: ['Depressão', 'Ansiedade', 'Estresse'],
      schedule: [
        { day: 'Hoje', date: '4 Fev', times: ['14:00', '16:00'] },
        { day: 'Amanhã', date: '5 Fev', times: ['09:00', '11:00'] },
        { day: 'Sex', date: '6 Fev', times: [] },
        { day: 'Sáb', date: '7 Fev', times: ['10:00'] },
      ],
    },
  ];

  filteredList: Specialist[] = [];

  constructor() {
    addIcons({
      star,
      closeCircleOutline,
      arrowForward,
      filter,
      locationOutline,
      peopleOutline,
      videocamOutline,
      timeOutline,
      calendarOutline,
      chatbubblesOutline,
      settingsOutline,
      logOutOutline,
    });
  }

  ngOnInit() {
    this.filteredList = [...this.specialists];
  }

  applyFilters() {
    const term = this.searchTerm.toLowerCase();

    this.filteredList = this.specialists.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(term) ||
        s.title.toLowerCase().includes(term);
      const matchesSpec = this.filterSpecialty
        ? s.title.toLowerCase().includes(this.filterSpecialty.toLowerCase())
        : true;
      const matchesLoc = this.filterLocation
        ? s.location.toLowerCase().includes(this.filterLocation.toLowerCase())
        : true;

      return matchesSearch && matchesSpec && matchesLoc;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.filterSpecialty = '';
    this.filterLocation = '';
    this.applyFilters();
  }

  openBooking(spec: Specialist) {
    this.selectedSpec = spec;
    this.isModalOpen = true;
  }
}
