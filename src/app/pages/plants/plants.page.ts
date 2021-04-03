import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonList, ModalController } from '@ionic/angular';
import { BedService } from 'src/app/services/bed.service';
import { PlantService } from 'src/app/services/plant.service';
import { RegistrarPlantPage } from '../registrar-plant/registrar-plant.page';
import { Plant } from '../../models/plant.model';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.page.html',
  styleUrls: ['./plants.page.scss'],
})
export class PlantsPage implements OnInit {
  @ViewChild(IonList) ionList: IonList;
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
      this.plants = [...resp.data];
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

    const { data } = await modal.onDidDismiss();

    // await modal.onDidDismiss().then( () =>{
    //   this.cargarPlants();
    // });
    this.cargarPlants();
  }

  async doRefresh( event){
    console.log(event);
    await this.cargarPlants();
    event.target.complete();
  }


  async desplantar(idBed:string,idSeed:string,plant:Plant){
    plant.status = 'desplantada';
    this.bedService.updatePlant(idBed,idSeed,plant).subscribe(res => {
      console.log(res);
      this.ionList.closeSlidingItems();
      this.cargarPlants();
    })
  }



}
