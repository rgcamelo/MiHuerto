import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Seed } from 'src/app/models/seed.model';
import { SeedService } from '../../services/seed.service';

@Component({
  selector: 'app-registrar-seed',
  templateUrl: './registrar-seed.page.html',
  styleUrls: ['./registrar-seed.page.scss'],
})
export class RegistrarSeedPage implements OnInit {

  seed:Seed = new Seed();

  constructor(private seedService:SeedService,
    private modalCtrl:ModalController,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  onSubmit(formulario : NgForm){
    this.presentLoading()
    this.seed.name = this.capitalizeFirstLetter(this.seed.name);
    if(this.seed != null){
      this.seedService.createSeed(this.seed).subscribe(res =>{

        this.dismissLoading();
        this.modalCtrl.dismiss('Registrar');
        console.log(res);
      })
    }

    
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
