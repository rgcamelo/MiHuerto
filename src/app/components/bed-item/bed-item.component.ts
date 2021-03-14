import { Component, Input, OnInit } from '@angular/core';
import { BedService } from 'src/app/services/bed.service';

@Component({
  selector: 'app-bed-item',
  templateUrl: './bed-item.component.html',
  styleUrls: ['./bed-item.component.scss'],
})
export class BedItemComponent implements OnInit {

  @Input() name:string;
  @Input() id:string;

  plants: Plant[] =[];

  constructor(private bedService:BedService,) { }

  ngOnInit() {
    this.cargarPlants();
  }

  

  cargarPlants(){
    this.bedService.getPlants(this.id).subscribe(resp =>{
      this.plants.push(...resp.data);
    });
  }

}
