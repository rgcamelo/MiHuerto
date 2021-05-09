import { Component, Input, OnInit } from '@angular/core';
import { Care as Cuidado} from 'src/app/models/care.model';
import { Care } from 'src/app/interfaces/careinterface';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PlantService } from 'src/app/services/plant.service';
import { Plant } from 'src/app/interfaces/plantInterface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-care',
  templateUrl: './editar-care.page.html',
  styleUrls: ['./editar-care.page.scss'],
})
export class EditarCarePage implements OnInit {
  @Input() care:Care;
  @Input() plant:Plant;
  editCare:Cuidado;
  
  constructor(private modalCtrl:ModalController,
    private plantService:PlantService,
    public loading: LoadingService,
    private alert:AlertService) { }

  ngOnInit() {
    this.editCare = {...this.care};
  }

  async onSubmit(formulario : NgForm){
    
    if(this.care != null){
      const res = await this.alert.presentAlertConfirm('Atención',`¿Esta seguro de editar este elemento de la bitacora?`);
          if (res == 'ok'){
            this.loading.presentLoading();
            this.plantService.updateCare(this.plant.id.toString(),this.care.id.toString(),this.care).subscribe(res =>{
              console.log(res);
              this.loading.dismiss();
              this.modalCtrl.dismiss('Registrar');
            })
          }
    }

    
  }

  get igual(){
    return this.editCare.type == this.care.type && this.editCare.description == this.care.description;
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }

}
