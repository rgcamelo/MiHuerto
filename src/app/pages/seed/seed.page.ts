import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SeedService } from '../../services/seed.service';
import { RegistrarSeedPage } from '../registrar-seed/registrar-seed.page';

@Component({
  selector: 'app-seed',
  templateUrl: './seed.page.html',
  styleUrls: ['./seed.page.scss'],
})
export class SeedPage implements OnInit {

  seeds:Seed[] = [];
  constructor(private seedService:SeedService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.cargarSeeds();
  }

  cargarSeeds(){
    this.seedService.getSeeds().subscribe( res =>{
      this.seeds.push(...res.data);
    })
  }

  async registrarSeed(){
    const modal = await this.modalCtrl.create({
      component: RegistrarSeedPage,
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    
    this.cargarSeeds();
    
  }

}
