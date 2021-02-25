import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
    private gardenService:GardenService, ) { }

  ngOnInit() {
  }

  onSubmit(formulario : NgForm){
    console.log('submit');
    console.log(formulario);
    console.log(this.garden);

    if(this.garden != null){
      this.gardenService.createGarden(this.garden).subscribe(res =>{
        console.log(res);
      })
    }

    this.modalCtrl.dismiss('Registrar');
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }

}

