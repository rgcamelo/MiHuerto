import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlantService } from 'src/app/services/plant.service';
import { Crop } from '../../models/crop.model';
import { Care } from '../../models/care.model';

@Component({
  selector: 'app-registrar-crop',
  templateUrl: './registrar-crop.page.html',
  styleUrls: ['./registrar-crop.page.scss'],
})
export class RegistrarCropPage implements OnInit {

  @Input() idPlant:string;
  crop:Crop = new Crop();

  constructor(private modalCtrl:ModalController,
    private plantService:PlantService) { }

  ngOnInit() {
  }

  onSubmit(formulario : NgForm){
    if(this.crop != null){
      this.plantService.createCrop(this.idPlant,this.crop).subscribe(res =>{
        this.modalCtrl.dismiss('Registrar');
        console.log(res);
      });

      let care:Care = new Care();
      care.type = 'crop';
      care.description = `Se han cosechado ${this.crop.quantity}lb`;
      this.plantService.createCare(this.idPlant,care).subscribe( res =>{
        console.log(res);
      });
    }

    
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }

}
