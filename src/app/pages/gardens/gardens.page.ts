import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonInfiniteScroll, LoadingController, ModalController, ToastController} from '@ionic/angular';
import { Garden, GardenObject, GardenOneObject } from 'src/app/interfaces/gardenInterface';
import { GardenService } from 'src/app/services/garden.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { RegistrarGardenPage } from '../registrar-garden/registrar-garden.page';

@Component({
  selector: 'app-gardens',
  templateUrl: './gardens.page.html',
  styleUrls: ['./gardens.page.scss'],
})
export class GardensPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  gardens : Garden[] = []
  next:string;

  constructor(private gardenService:GardenService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    public toast: ToastService,
    public loading:LoadingService
    ) {}

  ngOnInit(){
    this.cargarGardens();
  }

  cargarGardens(url?:string){
    this.loading.presentLoading();
    this.gardenService.getGardens(url).subscribe( resp =>{
      this.loading.dismiss();
      if(resp.data.length > 0){
        
        this.gardens.push(...resp.data);
        this.next = resp.meta.pagination.links.next;
      }
      
    });
  }

  borrarGarden(id:string){
    this.gardenService.deleteGarden(id).subscribe( res =>{
      this.toast.presentToast(`Huerto ${res.data.name} Eliminado`);
      this.doRefresh();
    });
    
  }
  

  async registrarGarden(){
    const modal = await this.modalCtrl.create({
      component: RegistrarGardenPage,
    });
    await modal.present();

    await modal.onDidDismiss().then( () => {
      this.toast.presentToast(`Nuevo Huerto añadido`);
      this.doRefresh();
    });

    
  }

  async presentActionSheet(id:string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      buttons: [{
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',
        cssClass:'rojo',
        handler: () => {
          this.borrarGarden(id);
        }
      }, {
        text: 'Editar',
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


  doRefresh(event?){
    this.infiniteScroll.disabled = false;
    this.gardens = [];
    this.cargarGardens();
    if (event) {
      event.target.complete();
    }
    
  }

  loadData(event){
    if (this.next) {
      this.cargarGardens(this.next);
    }else{
      this.infiniteScroll.disabled = true;
      
    }
    if (event) {
      event.target.complete();
    }
    
  }


  

}
