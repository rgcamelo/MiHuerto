import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { GardenService } from 'src/app/services/garden.service';
import { Ground } from '../../models/ground.model';
import { GroundService } from '../../services/ground.service';
import { Bed } from '../../models/bed.model';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-registrar-ground',
  templateUrl: './registrar-ground.page.html',
  styleUrls: ['./registrar-ground.page.scss'],
})
export class RegistrarGroundPage implements OnInit {

  ground:Ground = new Ground();
  @Input() idGarden:string;

  constructor(private modalCtrl:ModalController,
    private gardenService:GardenService,
    private groundService:GroundService,
    public loading: LoadingService,) { }

  ngOnInit() {
  }

  onSubmit(formulario : NgForm){
    this.loading.presentLoading();
    if(this.ground != null){
      this.gardenService.createGround(this.idGarden,this.ground).subscribe(async res =>{
        this.modalCtrl.dismiss('Registrar');
        this.loading.dismiss();
        // if(res!=null){
          
        //   if(this.ground.type == 'module'){
        //     await this.generateBedOfModule(this.ground.number_furrow,this.ground.number_terrace,res.data.id.toString());
        //     this.modalCtrl.dismiss('Registrar');
        //     this.dismissLoading();
        //   }
        //   if(this.ground.type == 'seedbed'){
        //     await this.generataBedOfSeedBed(this.ground.number_bed,res.data.id.toString());
        //     
        //   }
          
        // }
      })
    }

    
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }

  generateBedOfModule(nfurrow:number,nterrace:number,idGround:string){

    if (nfurrow > 0) {
      let furrow:Bed = new Bed();
      furrow.type='furrow'
      for (let i = 0; i < nfurrow; i++) {
        furrow.name=`Surco ${i+1}`;
        furrow.number = i;
        this.groundService.createBed(idGround,furrow).subscribe(res =>{
          console.log(res);
        })
      }
    }

    if (nterrace > 0) {
      let terrace:Bed = new Bed();
      terrace.type='terrace'
      for (let i = 0; i < nterrace; i++) {
        terrace.name=`Bancal ${i+1}`;
        terrace.number = i;
        this.groundService.createBed(idGround,terrace).subscribe(res =>{
          console.log(res);
        })
      }
    }
    
  }

  generataBedOfSeedBed(nbed:number,idGround:string){
    if (nbed > 0) {
      let bed:Bed = new Bed();
      bed.type='bed'
      for (let i = 0; i < nbed; i++) {
        bed.name=`Bandeja de Germinación ${i+1}`;
        bed.number = i;
        this.groundService.createBed(idGround,bed).subscribe(res =>{
          console.log(res);
        })
      }
    }
  }


}
