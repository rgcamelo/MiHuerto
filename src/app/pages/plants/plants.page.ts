import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BedService } from 'src/app/services/bed.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.page.html',
  styleUrls: ['./plants.page.scss'],
})
export class PlantsPage implements OnInit {

  reference:string = '';
  plants: Plant[] =[];

  constructor(private bedService:BedService,
    private route: ActivatedRoute ) { }

  ngOnInit(){
    this.cargarPlants();
  }

  cargarPlants(){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    console.log(this.reference);
    this.bedService.getPlants(this.reference).subscribe(resp =>{
      this.plants.push(...resp.data);
      console.log(this.plants);
    });
  }

}
