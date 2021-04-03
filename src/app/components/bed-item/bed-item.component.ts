import { Component, Input, OnInit } from '@angular/core';
import { BedService } from 'src/app/services/bed.service';
import { GroundService } from '../../services/ground.service';

@Component({
  selector: 'app-bed-item',
  templateUrl: './bed-item.component.html',
  styleUrls: ['./bed-item.component.scss'],
})
export class BedItemComponent implements OnInit {

  @Input() bed:Bed;

  plants: Plant[] =[];

  constructor(private bedService:BedService,
    private groundService:GroundService) { }

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
      console.log(res);
    });
  }

   mensaje(){
     console.log("Mensaje");
   }

}
