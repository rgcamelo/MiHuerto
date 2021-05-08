import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Care } from 'src/app/models/care.model';
import { AlertService } from 'src/app/services/alert.service';
import { PlantService } from '../../services/plant.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-registrar-care',
  templateUrl: './registrar-care.page.html',
  styleUrls: ['./registrar-care.page.scss'],
})
export class RegistrarCarePage implements OnInit {

  @Input() idPlant:string;
  care:Care = new Care();

  constructor(private modalCtrl:ModalController,
    private plantService:PlantService,
    public loading: LoadingService,
    private alert:AlertService) { }

  ngOnInit() {
  }

  async onSubmit(formulario : NgForm){
    
    if(this.care != null){
      const res = await this.alert.presentAlertConfirm('Atención',`¿Esta seguro de registrar este nuevo elemento en la bitacora?`);
          if (res == 'ok'){
            this.loading.presentLoading();
            this.plantService.createCare(this.idPlant,this.care).subscribe(res =>{
              console.log(res);
              this.loading.dismiss();
              this.modalCtrl.dismiss('Registrar');
            })
          }
    }

    
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }
}
