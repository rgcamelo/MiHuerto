import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Plant } from 'src/app/models/plant.model';
import { SeedService } from '../../services/seed.service';
import { BedService } from '../../services/bed.service';

@Component({
  selector: 'app-registrar-plant',
  templateUrl: './registrar-plant.page.html',
  styleUrls: ['./registrar-plant.page.scss'],
})
export class RegistrarPlantPage implements OnInit {

  plant:Plant = new Plant();
  seeds:Seed[] = [];
  @Input() idBed:string;
  idSeed:string;

  constructor(private modalCtrl:ModalController,
    private seedService:SeedService,
    private bedService:BedService) { }

  ngOnInit() {
    this.cargarSemillas();
  }

  onSubmit(formulario : NgForm){
    console.log('submit');
    console.log(formulario.value.idSeed);
    console.log(this.plant);

    this.idSeed = formulario.value.idSeed;

    if(this.plant != null){
      this.bedService.createPlant(this.idBed,this.idSeed,this.plant).subscribe( res =>{
        console.log(res);
      });
    }

    this.modalCtrl.dismiss('Registrar');
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }

  cargarSemillas(){
    this.seedService.getSeeds().subscribe( res =>{
      this.seeds.push(...res.data);
    })
  }

}