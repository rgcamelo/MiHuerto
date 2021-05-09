import { Component, Input, OnInit } from '@angular/core';
import { Care } from 'src/app/interfaces/careinterface';
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrls: ['./plant-item.component.scss'],
})
export class PlantItemComponent implements OnInit {

  @Input() id:string;

  cares: Care[] = [];

  constructor(private plantService:PlantService) { }

  ngOnInit() {
    this.cargarCares();
  }

  cargarCares(){
    this.plantService.getCares(this.id).subscribe(resp =>{
      
      this.cares.push(...resp.data);
      this.cares.reverse();
      console.log(this.cares);
    })
  }

}
