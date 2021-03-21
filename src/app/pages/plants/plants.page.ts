import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BedService } from 'src/app/services/bed.service';
import { RegistrarPlantPage } from '../registrar-plant/registrar-plant.page';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.page.html',
  styleUrls: ['./plants.page.scss'],
})
export class PlantsPage implements OnInit {

  reference:string = '';
  name:string ='';
  plants: Plant[] =[];

  constructor(private bedService:BedService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute ) { }

  ngOnInit(){
    this.cargarPlants();
    this.cargarBed();
  }

  cargarPlants(){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    console.log(this.reference);
    this.bedService.getPlants(this.reference).subscribe(resp =>{
      this.plants.push(...resp.data);
      console.log(this.plants);
    });
  }

  cargarBed(){
    this.bedService.getBed(this.reference).subscribe(res =>{
      this.name = res.data.name;
    });
  }

  async registrarPlant(){
    const modal = await this.modalCtrl.create({
      component: RegistrarPlantPage,
      componentProps:{
        'idBed' : this.reference,
      }
    });
    await modal.present();

    await modal.onDidDismiss().then( () =>{
      this.cargarPlants();
    });
  }



}
