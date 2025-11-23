import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-sing-up-customer',
  templateUrl: './sing-up-customer.page.html',
  styleUrls: ['./sing-up-customer.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonSelect,
    IonSelectOption,
    RouterLink,
  ],
})
export class SingUpCustomerPage implements OnInit {
  constructor() {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  ngOnInit() {}
}
