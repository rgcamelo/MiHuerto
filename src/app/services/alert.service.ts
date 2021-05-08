import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert:HTMLIonAlertElement;

  constructor(private alertController: AlertController) { 

    
  }

  async presentAlertConfirm(titulo:string,mensaje:string) {
    const alert = await this.alertController.create({
      cssClass: 'd-flex justify-content-center',
      header: titulo,
      message:mensaje,
      buttons: [
        {
          text: 'Si',
          role: 'ok', 
          cssClass: 'text-success',
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'text-danger',
        }, 
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    return role;
  }

}
