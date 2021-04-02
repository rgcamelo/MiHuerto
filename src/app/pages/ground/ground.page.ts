import { Component, OnInit } from '@angular/core';
import { GardenService } from '../../services/garden.service';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { RegistrarGroundPage } from '../registrar-ground/registrar-ground.page';
import { GroundService } from '../../services/ground.service';
import { Ground } from 'src/app/models/ground.model';
import { EditarGroundPage } from '../editar-ground/editar-ground.page';

@Component({
  selector: 'app-ground',
  templateUrl: './ground.page.html',
  styleUrls: ['./ground.page.scss'],
})
export class GroundPage implements OnInit {

  reference:string = '';

  nameHuerto:string = '';
  type:string='';
  grounds: Ground[] =[];

  constructor(private gardenService:GardenService,
    private groundService:GroundService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController, 
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit(){
    
  }

  ionViewWillEnter(){
    this.doRefresh();
    this.cargarNameGarden();
  }

  loadData(event){
    this.cargarGrounds(event);
    if (event) {
      event.target.complete();
    }
  }

  doRefresh(event?){
    this.grounds = [];
    this.reloadGround();
    if (event) {
      event.target.complete();
    }
    
  }

  reloadGround(){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    this.gardenService.getReloadGrounds(this.reference).subscribe(resp =>{
      this.grounds.push(...resp.data);
    });
  }

  cargarGrounds(event?){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    console.log(this.reference);
    this.gardenService.getGrounds(this.reference).subscribe(resp =>{

      if( resp.data.length === 0){
        if (event) {
          event.target.complete();
        }
        
      }
      this.grounds.push(...resp.data);
      console.log(this.grounds);
    });

    if(event){
      event.target.complete();
    }
  }

  cargarNameGarden(){
    this.gardenService.getGarden(this.reference).subscribe( res =>{
      console.log(res);
      this.nameHuerto = res.data.name;
    });
    
  }



  segmentChanged(event){
    //console.log(event.detail.value);
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

    const { data } = await modal.onDidDismiss();
    
    this.doRefresh();
    
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

    const { data } = await modal.onDidDismiss();
    
    this.doRefresh();
    
  }

  async presentActionSheet(ground:Ground) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      buttons: [{
        text: 'Limpiar Zona',
        role: 'destructive',
        icon: 'trash',
        cssClass:'rojo',
        handler: () => {
          this.limpiarZona(ground);
        }
      }, {
        text: 'Desplante',
        icon: 'shovel.svg',
        handler: () => {
          this.LimpiarPlantas(ground);
        }
      }, {
        text: 'Regar Zona',
        icon: 'trash',
        handler: () => {
          this.regarZona(ground);
        }
      },
      {
        text: 'Editar Zona',
        icon: 'trash',
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
      console.log(res);
    });
    this.doRefresh();
  }

  regarZona(ground:Ground){
    ground.status = 'riego'; 
    this.gardenService.updateGround(this.reference,ground.id.toString(),ground).subscribe( res => {
      console.log(res);
    });
    this.doRefresh();
  }

  

}
