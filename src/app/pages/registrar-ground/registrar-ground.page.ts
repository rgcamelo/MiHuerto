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
    console.log(this.idGarden);
  }

  onSubmit(formulario : NgForm){
    console.log('submit');
    console.log(formulario);
    console.log(this.ground);
    
    if(this.ground != null){
      this.gardenService.createGround(this.idGarden,this.ground).subscribe(res =>{
        console.log(res.data.id);
        if(res!=null){
          console.log("Hola");
          if(this.ground.type == 'module'){
            console.log("module");
            this.generateBedOfModule(this.ground.number_furrow,this.ground.number_terrace,res.data.id.toString());
          }
          if(this.ground.type == 'seedbed'){

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

    let furrow:Bed = new Bed();
    furrow.type='furrow'
    for (let i = 0; i < nfurrow; i++) {
      furrow.name="Surco "+i;
      this.groundService.createBed(idGround,furrow).subscribe(res =>{
        console.log(res);
      })
    }
  }

  generataBedOfSeedBed(){

  }

}
