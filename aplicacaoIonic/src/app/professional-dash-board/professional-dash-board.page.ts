import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonAvatar,
  IonBadge,
  IonButton,
  IonMenu,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  documentText,
  folderOpen,
  closeCircle,
  eye,
  create,
  download,
  gridOutline,
  peopleOutline,
  videocamOutline,
  briefcaseOutline,
  calendarOutline,
  chatbubblesOutline,
  settingsOutline,
  logOutOutline,
  timeOutline,
} from 'ionicons/icons';

interface Patient {
  id: string;
  user: string;
  name: string;
  gender: string;
  active: boolean;
}

@Component({
  selector: 'app-professional-dash-board',
  templateUrl: './professional-dash-board.page.html',
  styleUrls: ['./professional-dash-board.page.scss'],
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
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonAvatar,
    IonMenu,
    IonRouterLink,
    RouterLink,
  ],
})
export class ProfessionalDashBoardPage implements OnInit {
  patients: Patient[] = [
    {
      id: '1',
      user: 'user123',
      name: 'Ana Paula',
      gender: 'Feminino',
      active: true,
    },
    {
      id: '2',
      user: 'user456',
      name: 'João Silva',
      gender: 'Masculino',
      active: false,
    },
  ];

 
  calendarDays: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  currentDay = 6; 

  constructor() {
    addIcons({
      documentText,
      folderOpen,
      closeCircle,
      eye,
      create,
      download,
      gridOutline,
      peopleOutline,
      videocamOutline,
      briefcaseOutline,
      calendarOutline,
      chatbubblesOutline,
      settingsOutline,
      logOutOutline,
      timeOutline,
    });
  }

  ngOnInit() {}
}
