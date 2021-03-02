import { Component, Input, OnInit } from '@angular/core';
import { PlantService } from 'src/app/services/plant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.page.html',
  styleUrls: ['./plant.page.scss'],
})
export class PlantPage implements OnInit {

  reference:string = '';
  plant:Plant;
  cares: Care[] = [];

  constructor(private plantService:PlantService,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.cargarCares();
    this.cargarPlant();
  }

  cargarCares(){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    this.plantService.getCares(this.reference).subscribe(resp =>{
      
      this.cares.push(...resp.data);
      this.cares.reverse();
      console.log(this.cares);
    })
  }

  cargarPlant(){
    this.plantService.getPlant(this.reference).subscribe(res =>{
      console.log(res.data);
      this.plant.name = res.data.name;
    });
  }

}
