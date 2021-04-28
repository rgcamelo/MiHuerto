import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Ground } from '../../models/ground.model';
import { Bed } from '../../models/bed.model';
import { GroundService } from 'src/app/services/ground.service';
import { GardenService } from 'src/app/services/garden.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registar-bed',
  templateUrl: './registar-bed.page.html',
  styleUrls: ['./registar-bed.page.scss'],
})
export class RegistarBedPage implements OnInit {
  @Input() ground:Ground;
  @Input() tipo:string;
  numero:number = 0;
  ancho:number = 0;
  largo:number = 0;

  constructor(private modalCtrl:ModalController,
    public loadingController: LoadingController,
    private groundService:GroundService,
    private gardenService:GardenService) { }

  ngOnInit() {
  }

  async onSubmit(formulario : NgForm){
    this.presentLoading();
    if(this.tipo == 'surco'){
      this.generarFurrows();
    }

    if(this.tipo == 'bancal'){
      this.generarTerrace();
    }

    if(this.tipo == 'bandeja'){
      this.generarBeds();
    }
  }

  generarFurrows(){
    let antv = this.ground.number_furrow;
    this.ground.number_furrow = this.ground.number_furrow + this.numero;
      this.gardenService.updateGround(this.ground.huerto.toString(),this.ground.id.toString(),this.ground).pipe( finalize( ()=>{
        
      })).subscribe( async res =>{
        if (res) {
          let furrow:Bed = new Bed();
        furrow.type='furrow'
        console.log(antv);
        for (let i = antv; i < antv + this.numero; i++) {
          furrow.name=`Surco ${i+1}`;
          furrow.number = i;
          furrow.x = this.ancho;
          furrow.y = this.largo;

          console.log(i);
           await this.groundService.createBed(this.ground.id.toString(),furrow).toPromise();
        }

        this.dismissLoading();
            this.modalCtrl.dismiss('Registrar');
        }
      }); 
  }

  generarTerrace(){
    let antv = this.ground.number_terrace;
    this.ground.number_terrace = this.ground.number_terrace + this.numero;
      this.gardenService.updateGround(this.ground.huerto.toString(),this.ground.id.toString(),this.ground).subscribe( async res =>{
        if (res) {
          let terrace:Bed = new Bed();
        terrace.type='terrace'
        for (let i = antv; i < antv + this.numero; i++) {
          terrace.name=`Bancal ${i+1}`;
          terrace.number = i;
          terrace.x = this.ancho;
          terrace.y = this.largo;
          await this.groundService.createBed(this.ground.id.toString(),terrace).toPromise();
        }
          this.dismissLoading();
          this.modalCtrl.dismiss('Registrar');
        }
      }); 
      
  }

  generarBeds(){
    let antv = this.ground.number_bed;
    this.ground.number_bed = this.ground.number_bed + this.numero;
      this.gardenService.updateGround(this.ground.huerto.toString(),this.ground.id.toString(),this.ground).subscribe( async res =>{
        if (res) {
          let bed:Bed = new Bed();
        bed.type='bed'
        for (let i = antv; i < antv + this.numero; i++) {
          bed.name=`Bandeja de Germinación ${i+1}`;
          bed.number = i;
          bed.x = this.ancho;
          bed.y = this.largo;
          await this.groundService.createBed(this.ground.id.toString(),bed).toPromise();
        }
          this.dismissLoading();
          this.modalCtrl.dismiss('Registrar');
        }
      }); 
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

  get Valid(){
    return this.numero > 0 &&  this.ancho >0 && this.largo > 0; 
  }

}
