import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GardenService } from 'src/app/services/garden.service';
import { Ground } from '../../models/ground.model';
import { GroundService } from '../../services/ground.service';
import { Bed } from '../../models/bed.model';

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
    private groundService:GroundService) { }

  ngOnInit() {
  }

  onSubmit(formulario : NgForm){
    if(this.ground != null){
      this.gardenService.createGround(this.idGarden,this.ground).subscribe(res =>{
        if(res!=null){
          if(this.ground.type == 'module'){
            this.generateBedOfModule(this.ground.number_furrow,this.ground.number_terrace,res.data.id.toString());
          }
          if(this.ground.type == 'seedbed'){
            this.generataBedOfSeedBed(this.ground.number_bed,res.data.id.toString());
          }
        }
      })
    }

    this.modalCtrl.dismiss('Registrar');
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
        bed.name=`Bandeja de Semillas ${i+1}`;
        this.groundService.createBed(idGround,bed).subscribe(res =>{
          console.log(res);
        })
      }
    }
  }

}
