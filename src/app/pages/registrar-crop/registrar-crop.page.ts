import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlantService } from 'src/app/services/plant.service';
import { Crop } from '../../models/crop.model';
import { Care } from '../../models/care.model';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-registrar-crop',
  templateUrl: './registrar-crop.page.html',
  styleUrls: ['./registrar-crop.page.scss'],
})
export class RegistrarCropPage implements OnInit {

  @Input() idPlant:string;
  crop:Crop = new Crop();

  constructor(private modalCtrl:ModalController,
    private plantService:PlantService,
    private alert:AlertService,
    public loading: LoadingService,) { }

  ngOnInit() {
  }

  async onSubmit(formulario : NgForm){
    if(this.crop != null){
      const res = await this.alert.presentAlertConfirm('Atención',`¿Esta seguro de registrar una nueva cosecha?`);
          if (res == 'ok'){
            this.loading.presentLoading();
            
            let care:Care = new Care();
            care.type = 'crop';

            care.description = `Se han cosechado ${this.crop.quantity}lb`;
            this.plantService.createCare(this.idPlant,care).subscribe( res =>{
              this.crop.care = res.data.id;
              console.log(this.crop);
              this.plantService.createCrop(this.idPlant,this.crop).subscribe(res =>{      
                this.loading.dismiss();
                this.modalCtrl.dismiss('Registrar');
              });
              
            });
          }


      
    }

    
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }

}
