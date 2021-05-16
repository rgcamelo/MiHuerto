import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    public loadingController: LoadingController
  ) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      showBackdrop: false,
    });
    await loading.present();
  }

  async dismiss(){
    return await this.loadingController.dismiss();
  }
}
