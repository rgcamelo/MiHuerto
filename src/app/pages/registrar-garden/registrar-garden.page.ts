import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { GardenService } from 'src/app/services/garden.service';
import { Garden } from '../../models/garden.model';

@Component({
  selector: 'app-registrar-garden',
  templateUrl: './registrar-garden.page.html',
  styleUrls: ['./registrar-garden.page.scss'],
})
export class RegistrarGardenPage implements OnInit {

  garden:Garden = new Garden();

  constructor(private modalCtrl: ModalController,
    private gardenService:GardenService,
    public loadingController: LoadingController ) { }

  ngOnInit() {
  }

  onSubmit(formulario : NgForm){
    this.presentLoading();
    if(this.garden != null){
      this.gardenService.createGarden(this.garden).subscribe(res =>{
        
        console.log(res);
        this.modalCtrl.dismiss('Registrar');
        this.dismissLoading();
      })
    }

    
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
  }

  async dismissLoading(){
    return await this.loadingController.dismiss();
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }

}

