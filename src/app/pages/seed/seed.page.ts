import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonList, IonRefresher } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Seed } from 'src/app/interfaces/seedInterface';
import { AlertService } from 'src/app/services/alert.service';
import { ToastService } from 'src/app/services/toast.service';
import { SeedService } from '../../services/seed.service';
import { RegistrarSeedPage } from '../registrar-seed/registrar-seed.page';
import { EditarSeedPage } from '../editar-seed/editar-seed.page';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-seed',
  templateUrl: './seed.page.html',
  styleUrls: ['./seed.page.scss'],
})
export class SeedPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(IonList) ionList: IonList;
  next:string;
  seeds:Seed[] = [];
  
  constructor(private seedService:SeedService,
    private modalCtrl: ModalController,
    private toast:ToastService,
    private alert:AlertService,
    private loading:LoadingService) { }

  ngOnInit() {
    this.cargarSeeds();
  }

  async doRefresh(event?){
    this.seeds = [];
     this.infiniteScroll.disabled = false;
    await this.cargarSeeds();
    if (event) {
      console.log(event);
      event.target.complete();
    }

  }

  async cargarSeeds(url?:string){
    try {
      this.loading.presentLoading();
      const res = await this.seedService.getSeeds(url).toPromise()
      if (res.data.length > 0) {
            if (this.infiniteScroll.disabled == true) {
              this.infiniteScroll.disabled = false;
            }
            this.loading.dismiss();
            this.seeds.push(...res.data);
            this.next = res.meta.pagination.links.next;
          }
    } catch (error) {
      
    }
    

    // .subscribe( res =>{
    //   
    // })
  }

  async registrarSeed(){
    const modal = await this.modalCtrl.create({
      component: RegistrarSeedPage,
    });
    await modal.present();

    await modal.onDidDismiss().then( res => {
      
      if (res.data == 'Registrar') {
        this.toast.presentToast(`Nueva semilla registrada`);
        this.seeds = [];
        this.cargarSeeds();
      }
      
    });
  }

  loadData(event){
    if (event) {
      event.target.complete();
      if (this.next != undefined) {
        console.log(this.infiniteScroll.disabled);
        this.cargarSeeds(this.next);
      }else{
         this.infiniteScroll.disabled = true;
      }
    }
  }

  async deleteSeed(seed:Seed){
    const res = await this.alert.presentAlertConfirm('Atención',`Esta acción eliminara esta semilla, ¿Desea continuar?`);
            if(res == 'ok'){
              this.seedService.deleteSeed(seed.id.toString()).subscribe( res =>{
                this.toast.presentToast('Semilla borrada');
                this.doRefresh();
              });
            }
  }

  async editarSeed(seed:Seed){
    const modal = await this.modalCtrl.create({
      component: EditarSeedPage,
      componentProps:{
        'seed': seed,
      }
    });
    await modal.present();

    await modal.onDidDismiss().then( res => {
      this.doRefresh();
      if (res.data == 'Editar') {
        this.toast.presentToast(`Semilla editada`);      
      }
    });
    
  }

}
