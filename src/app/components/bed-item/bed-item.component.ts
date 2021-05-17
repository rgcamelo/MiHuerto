import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Bed } from 'src/app/interfaces/bedInterface';
import { Plant } from 'src/app/interfaces/plantInterface';
import { AlertService } from 'src/app/services/alert.service';
import { BedService } from 'src/app/services/bed.service';
import { environment } from 'src/environments/environment';
import { GroundService } from '../../services/ground.service';

@Component({
  selector: 'app-bed-item',
  templateUrl: './bed-item.component.html',
  styleUrls: ['./bed-item.component.scss'],
})
export class BedItemComponent implements OnInit {

  @Input() bed:Bed;
  @Output() ordenActualizar:EventEmitter<boolean> = new EventEmitter<boolean>();
  admin = environment.admin;
  

  plants: Plant[] =[];

  constructor(private bedService:BedService,
    private groundService:GroundService,
    public toastController: ToastController,
    private alert:AlertService) { }

  ngOnInit() {
    this.cargarPlants();
  }

  

  cargarPlants(){
    this.bedService.getPlants(this.bed.id.toString()).subscribe(resp =>{
      if(resp.data.length > 0){
        this.plants.push(...resp.data);
      }
      
    });
  }

  async limpiarBed(){
    let mens;
    if (this.bed.type == 'bed'){
      mens = `Esta acción vaciara la ${this.bed.name} ¿Desea continuar?`;
    } 
    else{
      mens = `Esta acción vaciara el ${this.bed.name} ¿Desea continuar?`;
    }
    const res = await this.alert.presentAlertConfirm('Atención',mens);
          if (res == 'ok'){
            this.bed.status = 'vacio'
            this.groundService.updateBed(this.bed.zona,this.bed.id.toString(),this.bed).subscribe( res =>{
            this.presentToast(`${res.data.name} se vacio`);
            this.ordenActualizar.emit(true);
            });
          }
    
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
