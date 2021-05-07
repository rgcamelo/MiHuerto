import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, IonInfiniteScroll, LoadingController, ModalController, ToastController} from '@ionic/angular';
import { Garden } from 'src/app/interfaces/gardenInterface';
import { GardenService } from 'src/app/services/garden.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { RegistrarGardenPage } from '../registrar-garden/registrar-garden.page';
import { EditarGardenPage } from '../editar-garden/editar-garden.page';

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
    public loading:LoadingService,
    public alertController: AlertController
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

    await modal.onDidDismiss().then( res => {
      this.doRefresh();
      if (res.data != 'Cancelar') {
        this.toast.presentToast(`Nuevo Huerto añadido`);
      }
    });
  }

  async editarGarden(garden:Garden){
    const modal = await this.modalCtrl.create({
      component: EditarGardenPage,
      componentProps:{
        'garden' : garden,
      }
    });
    await modal.present();

    await modal.onDidDismiss().then( res => {
      this.doRefresh();
      if (res.data != 'Cancelar') {
        this.toast.presentToast(`Huerto editado`);
      }
    });
  }



  async presentActionSheet(garden:Garden) {
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
          this.presentAlertConfirm(garden.id.toString());
        }
      }, {
        text: 'Editar',
        icon: 'pencil-outline',
        handler: () => {
          this.editarGarden(garden);
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

  async presentAlertConfirm(id:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Borrar Huerto',
      message: '¿Esta seguro de que va a borrar este huerto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'rojo',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          cssClass: 'success',
          handler: () => {
            this.borrarGarden(id);
          }
        }
      ]
    });

    await alert.present();
  }


  

}
