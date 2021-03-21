import { Component, Input, OnInit } from '@angular/core';
import { PlantService } from 'src/app/services/plant.service';
import { ActivatedRoute } from '@angular/router';
import { Planta } from 'src/app/models/planta.model';
import { ModalController } from '@ionic/angular';
import { RegistrarCarePage } from '../registrar-care/registrar-care.page';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.page.html',
  styleUrls: ['./plant.page.scss'],
})
export class PlantPage implements OnInit {

  reference:string = '';
  plant:Planta = new Planta();
  plantName:string;
  cares: Care[] = [];
  typeCare:string= '';

  constructor(private plantService:PlantService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.cargarCares();
    this.cargarPlant();
  }

  cargarCares(){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    this.plantService.getCares(this.reference).subscribe(resp =>{
      
      this.cares.push(...resp.data);
      this.cares.reverse();
      console.log(this.cares);
    })
  }

  cargarPlant(){
    this.plantService.getPlant(this.reference).subscribe(res =>{
      console.log(res.data);
      this.plant.nombre = res.data.name;
      this.plant.cantidad = res.data.quantity;
      this.plant.huerto = res.data.garden_name;
      this.plant.zona = res.data.ground_name;
      this.plant.cama = res.data.bed_name;
      this.plant.fechaPlantacion = res.data.created_at;
    });
  }

  async registrarCare(){
    const modal = await this.modalCtrl.create({
      component: RegistrarCarePage,
      componentProps:{
        'idPlant' : this.reference,
      }
    });
    await modal.present();

    await modal.onDidDismiss().then( () =>{
      //this.cargarPlants();
    });
  }

  segmentChanged(event){
    this.typeCare = event.detail.value;
  }

}
