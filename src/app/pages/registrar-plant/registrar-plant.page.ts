import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { Plant } from 'src/app/models/plant.model';
import { SeedService } from '../../services/seed.service';
import { BedService } from '../../services/bed.service';
import { Bed } from 'src/app/interfaces/bedInterface';
import { Seed } from 'src/app/interfaces/seedInterface';


@Component({
  selector: 'app-registrar-plant',
  templateUrl: './registrar-plant.page.html',
  styleUrls: ['./registrar-plant.page.scss'],
})
export class RegistrarPlantPage implements OnInit {

  next:string;

  plant:Plant = new Plant();
  seeds:Seed[] = [];
  seed:Seed;
  name:string = '';
  seleccionado = false;
  @Input() bed:Bed;

  constructor(private modalCtrl:ModalController,
    private seedService:SeedService,
    private bedService:BedService,
    public loadingController: LoadingController) { 
    }


  ngOnInit() {
  }

  onSubmit(formulario : NgForm){
    this.presentLoading();
    if(this.plant != null){
      this.bedService.createPlant(this.bed.id.toString(),this.seed.id.toString(),this.plant).subscribe( res =>{
        if (res) {
          this.dismissLoading();
          this.modalCtrl.dismiss('Registrar');
        }
        
      });
    }

    
  }

  imprimir(event){
    console.log(event);
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }

  cargarSeeds(buscar:string){
    if (buscar.length == 0) {
      this.seeds = [];
    }
    else{
      this.seedService.searchSeed(buscar).subscribe( res =>{
        if (res.data.length > 0) {
          this.seeds = [...res.data];
        }
      })
    }
    
  }

  medClicked(event, item) {
    this.seed = item;
    this.name = item.name;
    this.seleccionado = true;
    console.log(item);
  }

  limpiar(event){
    console.log("hola");
    this.name = "";
    this.seleccionado = false;
  }

  searchSeeds(event){
    console.log(event.detail.value);
    this.cargarSeeds(event.detail.value)
  }

  get nameValid(){
    return this.name.length > 0 && this.seleccionado && this.plant.quantity > 0
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
