import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SeedService } from '../../services/seed.service';
import { RegistrarSeedPage } from '../registrar-seed/registrar-seed.page';

@Component({
  selector: 'app-seed',
  templateUrl: './seed.page.html',
  styleUrls: ['./seed.page.scss'],
})
export class SeedPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  seeds:Seed[] = [];
  next:string;
  constructor(private seedService:SeedService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.cargarSeeds();
  }

  doRefresh(event?){
    this.infiniteScroll.disabled = false;
    this.seeds = [];
    this.cargarSeeds();
    if (event) {
      event.target.complete();
    }
    
  }

  cargarSeeds(url?:string){
    this.seedService.getSeeds(url).subscribe( res =>{
      if (res.data.length > 0) {
        this.seeds.push(...res.data);
        this.next = res.meta.pagination.links.next;
      }
      
    })
  }

  async registrarSeed(){
    const modal = await this.modalCtrl.create({
      component: RegistrarSeedPage,
    });
    await modal.present();

    await modal.onDidDismiss().then( () => {
      this.doRefresh();
    });
  }

  loadData(event){
    if (this.next) {
      this.cargarSeeds(this.next);
      event.target.complete();
    }else{
      this.infiniteScroll.disabled = true;
    }
    
    if (event) {
      
    }
  }

}
