import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController} from '@ionic/angular';
import { GardenService } from 'src/app/services/garden.service';
import { RegistrarGardenPage } from '../registrar-garden/registrar-garden.page';

@Component({
  selector: 'app-gardens',
  templateUrl: './gardens.page.html',
  styleUrls: ['./gardens.page.scss'],
})
export class GardensPage implements OnInit {

  gardens : Garden[] = []

  constructor(private gardenService:GardenService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
    ) {}

  ngOnInit(){
    this.cargarGardens();
  }

  cargarGardens(){
    this.gardenService.getGardens().subscribe(resp =>{
      this.gardens = resp.data;
    });
  }

  borrarGarden(id:string){
    this.gardenService.deleteGarden(id).subscribe(resp =>{
      console.log("Huerto Eliminado");
    });
  }
  

  async registrarGarden(){
    const modal = await this.modalCtrl.create({
      component: RegistrarGardenPage,
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    
    this.cargarGardens();
    
  }

  async presentActionSheet(id:string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        cssClass:'rojo',
        handler: () => {
          this.borrarGarden(id);
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

  imprimir(){
    console.log("HOla");
  }

  doRefresh( event){
    console.log(event);
    this.cargarGardens();
    event.target.complete();
  }
  

}
