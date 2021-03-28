import { Component, OnInit } from '@angular/core';
import { GardenService } from '../../services/garden.service';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { RegistrarGroundPage } from '../registrar-ground/registrar-ground.page';
import { GroundService } from '../../services/ground.service';

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
    this.cargarGrounds();
    this.cargarNameGarden();
  }

  cargarGrounds(){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    console.log(this.reference);
    this.gardenService.getGrounds(this.reference).subscribe(resp =>{
      this.grounds.push(...resp.data);
      console.log(this.grounds);
    });
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
    
    this.cargarGrounds();
    
  }

  async presentActionSheet(id:string) {
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
          this.limpiarZona(id);
        }
      }, {
        text: 'Update',
        icon: 'pencil-outline',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  limpiarZona(id:string){
    this.groundService.getBeds(id).subscribe( res =>{
      res.data.forEach( bed =>{
        this.groundService.deleteBed(id,bed.id.toString()).subscribe( res =>{
          console.log(res);
        });
      })
    })
  }

}
