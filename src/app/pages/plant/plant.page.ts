import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PlantService } from 'src/app/services/plant.service';
import { ActivatedRoute } from '@angular/router';
import { Planta } from 'src/app/models/planta.model';
import { IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { RegistrarCarePage } from '../registrar-care/registrar-care.page';
import { RegistrarCropPage } from '../registrar-crop/registrar-crop.page';
import { Plant } from 'src/app/interfaces/plantInterface';
import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.page.html',
  styleUrls: ['./plant.page.scss'],
})
export class PlantPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  reference:string = '';
  plant:Plant;
  plantName:string;
  cares: Care[] = [];
  typeCare:string= '';
  next:string;

  constructor(private plantService:PlantService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private loading:LoadingService,
    private toast:ToastService) { }

  ngOnInit() {
    this.cargarCares();
    this.cargarPlant();
  }

  cargarCares(url?:string){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    this.plantService.getCares(this.reference,url).subscribe(resp =>{
      if (resp.data.length > 0) {
        this.next = resp.meta.pagination.links.next;
        this.cares.push(...resp.data);
        console.log(this.cares);
      }
      
      
    })
  }

  cargarPlant(){
    this.loading.presentLoading();
    this.plantService.getPlant(this.reference).subscribe(res =>{
      this.loading.dismiss();
      console.log(res.data);
      this.plant = res.data
    });
  }

  async registrarCare(){
    const modal = await this.modalCtrl.create({
      component: RegistrarCarePage,
      componentProps:{
        'idPlant' : this.reference,
      }
    });
    await modal.present();

    await modal.onDidDismiss().then( res =>{
      this.doRefresh();
      if (res.data != 'Cancelar') {
        this.toast.presentToast(`Listo`);
      }
    });
  }

  async registrarCrop(){
    const modal = await this.modalCtrl.create({
      component: RegistrarCropPage,
      componentProps:{
        'idPlant' : this.reference,
      }
    });
    await modal.present();

    await modal.onDidDismiss().then( res =>{
      this.doRefresh();
      if (res.data != 'Cancelar') {
        this.toast.presentToast(`Listo`);
      }
    });
  }

  segmentChanged(event){
    this.typeCare = event.detail.value;
  }

  loadData(event){
    console.log("Hola");
    if (this.next) {
      this.cargarCares(this.next);
    }else{
      this.infiniteScroll.disabled = true;
    }
    if (event) {
      event.target.complete();
    }
    
  }

  doRefresh(event?){
    this.infiniteScroll.disabled = false;
    this.cares= [];
    this.cargarCares();
    if (event) {
      event.target.complete();
    }
  }
}
