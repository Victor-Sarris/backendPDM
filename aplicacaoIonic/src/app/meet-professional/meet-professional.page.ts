import { Component, OnInit } from '@angular/core';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-meet-professional',
  templateUrl: './meet-professional.page.html',
  styleUrls: ['./meet-professional.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class MeetProfessionalPage
  implements OnInit, ViewWillEnter, ViewWillLeave
{
  api: any = null;

  constructor(private router: Router) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.startMeet();
  }

  // Roda quando a página VAI SAIR (garante que desliga a câmera)
  ionViewWillLeave() {
    if (this.api) {
      console.log('Encerrando chamada Jitsi...');
      this.api.dispose();
      this.api = null;
    }
  }

  startMeet() {
    const domain = 'meet.jit.si';

    const roomName = 'TherapyConsultaDaviClarice';

    const options = {
      roomName: roomName,
      width: '100%',
      height: '100%',
      
      parentNode: document.querySelector('#jitsi-container'),

      userInfo: {
        displayName: 'Psi. Felipe Sousa', 
      },

      // Suas configurações originais
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: false,
        prejoinPageEnabled: false,
        disableDeepLinking: true, 
        toolbarButtons: [
          'microphone',
          'camera',
          'desktop',
          'hangup',
          'profile',
          'chat',
          'recording',
          'livestreaming',
          'etherpad',
          'sharedvideo',
          'settings',
          'raisehand',
          'videoquality',
          'filmstrip',
          'feedback',
          'stats',
          'shortcuts',
          'tileview',
          'videobackgroundblur',
          'fullscreen',
          'mute-everyone',
        ],
      },
      interfaceConfigOverwrite: {
        DEFAULT_BACKGROUND: '#fafafd',
        SHOW_CHROME_EXTENSION_BANNER: false,
        TOOLBAR_BUTTONS: [
          'microphone',
          'camera',
          'desktop',
          'hangup',
          'profile',
          'chat',
          'raisehand',
          'settings',
        ],
        SETTINGS_SECTIONS: ['devices', 'language', 'profile', 'moderator'],
        LANG_DETECTION: true,
        DEFAULT_REMOTE_DISPLAY_NAME: 'Paciente',
        MOBILE_APP_PROMO: false,
      },
    };

    this.api = new JitsiMeetExternalAPI(domain, options);

    this.api.addEventListener('readyToClose', () => {
      console.log('Usuário clicou em desligar.');

      setTimeout(() => {
        if (this.api) {
          this.api.dispose();
          this.api = null;
        }
        this.router.navigate(['/professional-dash-board']);
      }, 100);
    });
  }
}
