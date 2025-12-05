import { Component, OnInit } from '@angular/core';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
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

// variavel para inicializacao de particula
declare var particlesJS: any
@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.page.html',
  styleUrls: ['./role-selection.page.scss'],
  standalone: true,
  imports: [ IonContent, CommonModule, FormsModule, RouterLink, IonRouterLink, IonRouterLink, RouterLink],
})
export class RoleSelectionPage implements OnInit, ViewWillEnter, ViewWillLeave {
  constructor() {
    addIcons({ heart });
  }

  ngOnInit() {
    particlesJS.load('particles-role-selection', 'assets/particles.json', function() {
      console.log('callback - particles.js config loaded');
    });
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.initParticles();
    }, 100);
  }

  ionViewWillLeave() {
    const w: any = window;
    if (w.pJSDom && w.pJSDom.length > 0) {
      w.pJSDom[0].pJS.fn.vendors.destroypJS();
      w.pJSDom = [];
    }
  }

  initParticles() {
    const particlesDiv = document.getElementById('particles-role-selection');
    if (particlesDiv) {
      particlesJS.load('particles-role-selection', 'assets/particles.json', function () {
        console.log('✨ Particles carregadas com sucesso!');
      });
    }
  }

  selectRole(role: string) {
    console.log('Role selecionada:', role);
  }
}
