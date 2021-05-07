import { Component, OnInit, ViewChild } from '@angular/core';
import { GardenService } from '../../services/garden.service';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, IonInfiniteScroll, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { RegistrarGroundPage } from '../registrar-ground/registrar-ground.page';
import { GroundService } from '../../services/ground.service';
import { Ground } from 'src/app/models/ground.model';
import { EditarGroundPage } from '../editar-ground/editar-ground.page';
import { Garden } from '../../models/garden.model';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-ground',
  templateUrl: './ground.page.html',
  styleUrls: ['./ground.page.scss'],
})
export class GroundPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  reference:string = '';
  type:string='';
  next:string;
  garden:Garden = new Garden();
  grounds: Ground[] =[];

  constructor(private gardenService:GardenService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController, 
    private actionSheetCtrl: ActionSheetController,
    private toast:ToastService,
    public loading:LoadingService) { }

  ngOnInit(){
    this.cargarGarden();
    this.cargarGrounds();
  }

  doRefresh(event?){
    this.infiniteScroll.disabled = false;
    this.grounds = [];
    this.cargarGrounds();
    if (event) {
      event.target.complete();
    }
  }

  loadData(event){
    if (this.next) {
      this.cargarGrounds(this.next);
    }else{
      this.infiniteScroll.disabled = true;
      
    }
    if (event) {
      event.target.complete();
    }
    
  }
  cargarGrounds(url?:string){
    this.loading.presentLoading();
    this.gardenService.getGrounds(this.reference,url).subscribe(resp =>{
      this.loading.dismiss();
      if (resp.data.length > 0){
      this.grounds.push(...resp.data);
      this.next = resp.meta.pagination.links.next;
      
      }
      
    });
  }

  cargarGarden(){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    this.gardenService.getGarden(this.reference).subscribe( res =>{
      this.garden.name = res.data.name;
    });
    
  }



  segmentChanged(event){
    this.type = event.detail.value;
  }

  async registrarGround(){
    const modal = await this.modalCtrl.create({
      component: RegistrarGroundPage,
      componentProps:{
        'idGarden' : this.reference,
      }
    });
    await modal.present();

    await modal.onDidDismiss().then( res => {
      
      this.doRefresh();
      if (res.data != 'Cancelar') {
        this.toast.presentToast(`Nueva zona Registrada`);      
      }
    });
    
  }

  async editarGround(idGarden:string,ground:Ground){
    const modal = await this.modalCtrl.create({
      component: EditarGroundPage,
      componentProps:{
        'idGarden' : idGarden,
        'ground' : ground,
      }
    });
    await modal.present();

    await modal.onDidDismiss().then( () => {
      this.doRefresh();
      
    });
    
  }

  async presentActionSheet(ground:Ground) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      buttons: [{
        text: 'Desplante',
        icon: 'assets/icon/pala.svg',
        handler: () => {
          this.LimpiarPlantas(ground);
        }
      }, {
        text: 'Regar Zona',
        icon: 'assets/icon/aspersor.svg',
        handler: () => {
          this.regarZona(ground);
        }
      },
      {
        text: 'Editar Zona',
        icon: 'assets/icon/editar.svg',
        handler: () => {
          this.editarGround(this.reference,ground);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  limpiarZona(ground:Ground){

      ground.status = 'vacio';
      ground.number_furrow = 0;
      ground.number_terrace = 0;
      ground.number_bed = 0;

      this.gardenService.updateGround(this.reference,ground.id.toString(),ground).subscribe( res =>{
        console.log(res);
      });

    this.doRefresh();
  }

  LimpiarPlantas(ground:Ground){
    ground.status = 'desplante';
    this.gardenService.updateGround(this.reference,ground.id.toString(),ground).subscribe( res => {
      this.toast.presentToast(`Plantas Desplantadas`);
      //this.doRefresh();
    });
    
  }

  regarZona(ground:Ground){
    ground.status = 'riego'; 
    this.gardenService.updateGround(this.reference,ground.id.toString(),ground).subscribe( res => {
      this.toast.presentToast(`Zona: ${res.data.name} Regada`);
      //this.doRefresh();
    });
    
  }



}
