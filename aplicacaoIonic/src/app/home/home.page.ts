import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonRow,
  IonGrid,
  IonFabList,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowForwardOutline,
  starOutline,
  peopleOutline,
  chatboxOutline,
  mailOutline,
  callOutline,
  globeOutline,
  heart,
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonFabList,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    RouterLink,
  ],
})
export class HomePage implements OnInit {
  constructor() {
    addIcons({
      arrowForwardOutline,
      starOutline,
      peopleOutline,
      chatboxOutline,
      mailOutline,
      callOutline, 
      globeOutline, 
      heart,
    });
  }

  ngOnInit() {}

  testimonials = [
    {
      quote:
        'Estou muito animada para conhecer a plataforma! Acredito que ela vai facilitar meu acesso a atendimentos de qualidade sem sair de casa.',
      author: 'Ana Paula',
      role: 'Cliente',
      icon: 'chatbox-quote-outline', // Lembre de registrar no addIcons
      avatar: 'https://i.pravatar.cc/150?u=ana', // Placeholder de imagem
    },
    {
      quote:
        'Tenho grandes expectativas em relação ao MVP. Espero que ele facilite ainda mais a conexão entre psicólogos e pacientes, trazendo organização e eficiência.',
      author: 'Felipe Silva',
      role: 'Psicólogo',
      icon: 'star-outline',
      avatar: 'https://i.pravatar.cc/150?u=felipe',
    },
    {
      quote:
        'Tenho grandes expectativas. Acredito que essa inovação vai aproximar as pessoas do cuidado psicológico e transformar o acesso à saúde mental.',
      author: 'Adilon Oliveira',
      role: 'Psicólogo',
      icon: 'people-outline',
      avatar: 'https://i.pravatar.cc/150?u=adilon',
    },
  ];
}
