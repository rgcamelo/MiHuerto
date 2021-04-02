import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Bed } from 'src/app/models/bed.model';
import { GardenService } from 'src/app/services/garden.service';
import { GroundService } from 'src/app/services/ground.service';
import { Ground } from '../../models/ground.model';

@Component({
  selector: 'app-editar-ground',
  templateUrl: './editar-ground.page.html',
  styleUrls: ['./editar-ground.page.scss'],
})
export class EditarGroundPage implements OnInit {

  @Input() idGarden:string;
  @Input() ground:Ground;

  constructor(private modalCtrl:ModalController,
    private gardenService:GardenService,
    private groundService:GroundService) { }

  ngOnInit() {
  }

   onSubmit(formulario : NgForm){
    this.limpiarZona();
    
    this.modalCtrl.dismiss('Registrar');
  }

  generarNuevosBeds(){
    if(this.ground != null){
      console.log("Llego");
      if(this.ground.type == 'module'){
        this.generateBedOfModule(this.ground.number_furrow,this.ground.number_terrace,this.ground.id.toString());
      }
      if(this.ground.type == 'seedbed'){
        this.generataBedOfSeedBed(this.ground.number_bed,this.ground.id.toString());
      }
    }
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }

  async limpiarZona(){
    if (this.ground.type == 'module') {
      this.ground.number_bed = 0;
    }

    if (this.ground.type == 'seedbed') {
      this.ground.number_furrow = 0;
      this.ground.number_terrace = 0;
    }
    this.ground.status = 'vacio';
    await this.gardenService.updateGround(this.idGarden,this.ground.id.toString(),this.ground).subscribe( res =>{
      this.generarNuevosBeds();
    }); 
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
        bed.name=`Bandeja de Semillas ${i}`;
        this.groundService.createBed(idGround,bed).subscribe(res =>{
          console.log(res);
        })
      }
    }
  }

}
