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
  name:string ='';
  plants: Plant[] =[];

  constructor(private bedService:BedService,
    private route: ActivatedRoute ) { }

  ngOnInit(){
    this.cargarPlants();
    this.cargarBed();
  }

  cargarPlants(){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    console.log(this.reference);
    this.bedService.getPlants(this.reference).subscribe(resp =>{
      this.plants.push(...resp.data);
      console.log(this.plants);
    });
  }

  cargarBed(){
    this.bedService.getBed(this.reference).subscribe(res =>{
      this.name = res.data.name;
    });
  }

  segmentChanged(event){
    this.name = event.detail.value;
  }


}
