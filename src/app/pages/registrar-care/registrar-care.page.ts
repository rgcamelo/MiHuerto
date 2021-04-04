import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Care } from 'src/app/models/care.model';
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-registrar-care',
  templateUrl: './registrar-care.page.html',
  styleUrls: ['./registrar-care.page.scss'],
})
export class RegistrarCarePage implements OnInit {

  @Input() idPlant:string;
  care:Care = new Care();

  constructor(private modalCtrl:ModalController,
    private plantService:PlantService) { }

  ngOnInit() {
  }

  onSubmit(formulario : NgForm){
    if(this.care != null){
      this.plantService.createCare(this.idPlant,this.care).subscribe(res =>{
        console.log(res);
      })
    }

    this.modalCtrl.dismiss('Registrar');
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }

}
