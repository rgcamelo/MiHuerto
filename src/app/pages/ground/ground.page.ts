import { Component, OnInit } from '@angular/core';
import { GardenService } from '../../services/garden.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegistrarGroundPage } from '../registrar-ground/registrar-ground.page';

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
    private route: ActivatedRoute,
    private modalCtrl: ModalController, ) { }

  ngOnInit(){
    this.cargarGrounds();
    this.cargarNameGarden();
  }

  cargarGrounds(){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    console.log(this.reference);
    this.gardenService.getGrounds(this.reference).subscribe(resp =>{
      this.grounds.push(...resp.data);
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

}
