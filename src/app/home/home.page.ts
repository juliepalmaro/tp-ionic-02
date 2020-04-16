import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { filter } from 'rxjs/operators';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title: string;
  geolocArray: { lat: number, lng: number}[] = [];

  constructor(private alertController: AlertController, private geolocation: Geolocation, private localNotifications: LocalNotifications) {
    this.load();
  }

  updateTitle() {
    this.title = 'Mon Nouveau Titre';
  }

  /**
   * https://ionicframework.com/docs/api/alert
   */
  async fireAlert() {
    // creation de l alerte
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
    // quand l alerte sera masquée
    alert.onDidDismiss().then(() => console.log('alerte masquée'))

    // affichage de l alerte
    await alert.present();
  }

  load() {
    const watch = this.geolocation.watchPosition().pipe(filter((p) => p.coords !== undefined));
    watch.subscribe((data) => {
      this.geolocArray.push({ lat: data.coords.latitude, lng: data.coords.longitude });
    });
  }

  simpleNotif() {
    this.localNotifications.schedule({
      id: 1,
      text: 'Single Local Notification',
      sound: 'file://sound.mp3',
      data: { secret: 'secret' }
    });
  }

}
