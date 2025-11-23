import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonRouterOutlet,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.page.html',
  styleUrls: ['./role-selection.page.scss'],
  standalone: true,
  imports: [ IonContent, CommonModule, FormsModule, RouterLink, IonRouterLink, IonRouterLink, RouterLink],
})
export class RoleSelectionPage implements OnInit {
  constructor() {
    addIcons({ heart });
  }

  ngOnInit() {}

  selectRole(role: string) {
    console.log('Role selecionada:', role);
  }
}
