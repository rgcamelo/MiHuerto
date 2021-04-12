import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BedService } from 'src/app/services/bed.service';
import { GroundService } from '../../services/ground.service';

@Component({
  selector: 'app-bed-item',
  templateUrl: './bed-item.component.html',
  styleUrls: ['./bed-item.component.scss'],
})
export class BedItemComponent implements OnInit {

  @Input() bed:Bed;
  @Output() ordenActualizar:EventEmitter<boolean> = new EventEmitter<boolean>();
  

  plants: Plant[] =[];

  constructor(private bedService:BedService,
    private groundService:GroundService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.cargarPlants();
  }

  

  cargarPlants(){
    this.bedService.getPlants(this.bed.id.toString()).subscribe(resp =>{
      this.plants.push(...resp.data);
    });
  }

  limpiarBed(){
    this.bed.status = 'vacio'
    this.groundService.updateBed(this.bed.zona,this.bed.id.toString(),this.bed).subscribe( res =>{
      this.presentToast(`${res.data.name} Vacio`);
      this.ordenActualizar.emit(true);
    });
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
