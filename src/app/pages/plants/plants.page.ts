import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, IonList, LoadingController, ModalController } from '@ionic/angular';
import { BedService } from 'src/app/services/bed.service';
import { PlantService } from 'src/app/services/plant.service';
import { RegistrarPlantPage } from '../registrar-plant/registrar-plant.page';
import { Plant } from '../../models/plant.model';
import { Bed } from 'src/app/interfaces/bedInterface';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { AlertService } from 'src/app/services/alert.service';
import { TransplantPage } from '../transplant/transplant.page';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.page.html',
  styleUrls: ['./plants.page.scss'],
})
export class PlantsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonList) ionList: IonList;
  admin = environment.admin;
  reference:string = '';
  name:string ='';
  next:string;
  bed:Bed;
  plants: Plant[] =[];

  constructor(private bedService:BedService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private loading:LoadingService,
    private toast:ToastService,
    private alert:AlertService ) { }

  ngOnInit(){
    this.cargarPlants();
    this.cargarBed();
  }

  cargarPlants(url?:string){
    // this.loading.presentLoading();
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    this.bedService.getPlants(this.reference,url).subscribe(resp =>{
      // this.loading.dismiss();
      if (resp.data.length > 0) {
        this.plants = [...resp.data];
        console.log(this.plants);
      }
      
    });
  }

  cargarBed(){
    this.bedService.getBed(this.reference).subscribe(res =>{
      this.bed = res.data;
    });
  }

  async registrarPlant(){
    const modal = await this.modalCtrl.create({
      component: RegistrarPlantPage,
      componentProps:{
        'bed' : this.bed,
      }
    });
    await modal.present();

    await modal.onDidDismiss().then( res =>{
       this.doRefresh();
       if (res.data == 'Registrar') {
        this.toast.presentToast(`Listo`);
      }
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
    const res = await this.alert.presentAlertConfirm('Atención',`¿Esta seguro de eliminar este elemento?`);
          if (res == 'ok'){
            plant.status = 'desplantada';
            this.bedService.updatePlant(idBed,idSeed,plant.id.toString(),plant).subscribe(res => {
            this.ionList.closeSlidingItems();
            this.doRefresh();
            this.toast.presentToast(`Listo`);
            })
          }
    
  }

  

  update(){

  }

  async transplantar(plant:Plant){
    const modal = await this.modalCtrl.create({
      component: TransplantPage,
      componentProps:{
        'plant' : plant,
      }
    });
    await modal.present();

    await modal.onDidDismiss().then( res =>{
       this.doRefresh();
       if (res.data == 'Transplantar') {
        this.toast.presentToast(`Trasplante completo`);
      }
    });

  }







}
