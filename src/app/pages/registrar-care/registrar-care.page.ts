import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Care } from 'src/app/models/care.model';
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-registrar-care',
  templateUrl: './registrar-care.page.html',
  styleUrls: ['./registrar-care.page.scss'],
})
export class RegistrarCarePage implements OnInit {

  @Input() idPlant:string;
  care:Care = new Care();

  constructor(private modalCtrl:ModalController,
    private plantService:PlantService,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  onSubmit(formulario : NgForm){
    this.presentLoading();
    if(this.care != null){
      this.plantService.createCare(this.idPlant,this.care).subscribe(res =>{
        console.log(res);
        this.dismissLoading();
        this.modalCtrl.dismiss('Registrar');
      })
    }

    
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
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

}
