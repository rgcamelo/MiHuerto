import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PlantService } from 'src/app/services/plant.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegistrarCarePage } from '../registrar-care/registrar-care.page';
import { RegistrarCropPage } from '../registrar-crop/registrar-crop.page';
import { Plant } from 'src/app/interfaces/plantInterface';
import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';
import { Care } from 'src/app/interfaces/careinterface';
import { AlertService } from 'src/app/services/alert.service';
import { EditarCarePage } from '../editar-care/editar-care.page';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.page.html',
  styleUrls: ['./plant.page.scss'],
})
export class PlantPage implements OnInit {

  reference:string = '';
  plant:Plant;
  plantName:string;
  cares: Care[] = [];
  typeCare:string= '';
  next:string;
  admin = environment.admin;

  constructor(private plantService:PlantService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private loading:LoadingService,
    private toast:ToastService,
    private alert:AlertService) { }

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
    // this.loading.presentLoading();
    this.plantService.getPlant(this.reference).subscribe(res =>{
      // this.loading.dismiss();
      console.log(res.data);
      this.plant = res.data
    });
  }

  async registrarCare(){
    const modal = await this.modalCtrl.create({
      component: RegistrarCarePage,
      componentProps:{
        'plant' : this.plant,
      }
    });
    await modal.present();

    await modal.onDidDismiss().then( res =>{
      this.doRefresh();
      if (res.data == 'Registrar') {
        this.toast.presentToast(`Nuevo elemento añadido a la bitácora`);
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
      if (res.data == 'Registrar') {
        this.toast.presentToast(`Nueva cosecha registrada`);
      }
    });
  }

  segmentChanged(event){
    this.typeCare = event.detail.value;
  }

  doRefresh(event?){
    this.cares= [];
    this.cargarCares();
    if (event) {
      event.target.complete();
    }
  }

  async deleteCare(care:Care){
    const res = await this.alert.presentAlertConfirm('Atención',`Esta accion eliminara este elemento de la bitácora, ¿Desea continuar?`);
          if(res == 'ok'){
            this.plantService.deleteCare(this.plant.id.toString(),care.id.toString()).subscribe( res =>{
              this.toast.presentToast('Elemento de bitácora borrado');
              this.doRefresh();
            });
          }
  }

  async updateCare(care:Care){
    const modal = await this.modalCtrl.create({
      component: EditarCarePage,
      componentProps:{
        'care' : care,
        'plant' : this.plant,
      }
    });
    await modal.present();

    await modal.onDidDismiss().then( res => {
      this.doRefresh();
      if (res.data == 'Editar') {
        this.toast.presentToast(`Bitácora editada`);
      }
    });
  }

  onCareScroll(event) {
    let esp = event.srcElement.scrollTop+ 400;
    let val = event.srcElement.scrollHeight;
    if(esp === val){
      console.log("entro");
      if (this.next != null) {
        this.cargarCares(this.next);
      }
      
    }
  }
}
