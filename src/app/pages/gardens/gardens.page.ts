import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonInfiniteScroll, LoadingController, ModalController, ToastController} from '@ionic/angular';
import { GardenService } from 'src/app/services/garden.service';
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
    public toastController: ToastController,
    public loadingController: LoadingController
    ) {}

  ngOnInit(){
    this.cargarGardens();
  }

  cargarGardens(url?:string){
    this.gardenService.getGardens(url).subscribe(resp =>{
      if(resp.data.length > 0){
        this.gardens.push(...resp.data);
        this.next = resp.meta.pagination.links.next;
      }
      
    });
  }

  borrarGarden(id:string){
    this.presentLoading();
    this.gardenService.deleteGarden(id).subscribe(resp =>{
      this.dismissLoading();
      this.presentToast(`Huerto ${resp.data.name} Eliminado`);
    });
  }
  

  async registrarGarden(){
    const modal = await this.modalCtrl.create({
      component: RegistrarGardenPage,
    });
    await modal.present();

    await modal.onDidDismiss().then( () => {
      this.doRefresh();
    });

    
  }

  async presentActionSheet(id:string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
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

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
    });
    await loading.present();
  }

  async dismissLoading(){
    this.doRefresh();
    return await this.loadingController.dismiss();
  }
  

}
