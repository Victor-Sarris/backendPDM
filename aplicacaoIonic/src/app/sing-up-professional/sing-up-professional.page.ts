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
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';

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

  constructor() { 
    addIcons({ eyeOutline, eyeOffOutline });
  }

  ngOnInit() {
  }

}