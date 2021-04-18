import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, IonList, ModalController } from '@ionic/angular';
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
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonList) ionList: IonList;
  reference:string = '';
  name:string ='';
  next:string;
  plants: Plant[] =[];

  constructor(private bedService:BedService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute ) { }

  ngOnInit(){
    this.cargarPlants();
    this.cargarBed();
  }

  cargarPlants(url?:string){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    this.bedService.getPlants(this.reference,url).subscribe(resp =>{
      if (resp.data.length > 0) {
        this.plants.push(...resp.data);
        console.log(this.plants);
      }
      
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
       this.doRefresh();
    });

  }

  doRefresh(event?){
    this.infiniteScroll.disabled = false;
    this.plants = [];
    this.cargarPlants();
    if (event) {
      event.target.complete();
    }
  }

  loadData(event){
    if (this.next) {
      this.cargarPlants(this.next);
    }else{
      this.infiniteScroll.disabled = true;
      
    }
    if (event) {
      event.target.complete();
    }
    
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
