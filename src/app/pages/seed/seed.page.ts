import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonList, IonRefresher } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Seed } from 'src/app/interfaces/seedInterface';
import { ToastService } from 'src/app/services/toast.service';
import { SeedService } from '../../services/seed.service';
import { RegistrarSeedPage } from '../registrar-seed/registrar-seed.page';

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
    private toast:ToastService) { }

  ngOnInit() {
    this.cargarSeeds();
  }

  async doRefresh(event?){
    this.seeds = [];
    console.log("Reinicio",this.infiniteScroll.disabled);
     this.infiniteScroll.disabled = false;
    await this.cargarSeeds();
    if (event) {
      console.log(event);
      event.target.complete();
    }

  }

  async cargarSeeds(url?:string){
    try {
      const res = await this.seedService.getSeeds(url).toPromise()
      if (res.data.length > 0) {
            if (this.infiniteScroll.disabled == true) {
              this.infiniteScroll.disabled = false;
            }

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
      this.seeds = [];
      this.cargarSeeds();
      if (res.data != 'Cancelar') {
        this.toast.presentToast(`Listo`);
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

}
