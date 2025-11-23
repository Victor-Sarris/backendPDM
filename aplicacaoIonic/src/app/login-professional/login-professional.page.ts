import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonInput,
  IonCheckbox,
  IonButton,
  IonRouterLinkWithHref, IonRouterLink
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, personOutline, lockClosedOutline } from 'ionicons/icons';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login-professional',
  templateUrl: './login-professional.page.html',
  styleUrls: ['./login-professional.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonIcon,
    IonItem,
    IonInput,
    IonCheckbox,
    IonButton,
    RouterLink
  ],
})
export class LoginProfessionalPage implements OnInit {
  constructor() {
    addIcons({ heart, personOutline, lockClosedOutline });
  }

  ngOnInit() {}
}
