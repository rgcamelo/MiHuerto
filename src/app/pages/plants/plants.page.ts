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
  firstname:string ='';

  constructor(private bedService:BedService,
    private route: ActivatedRoute ) { }

  ngOnInit(){
    this.cargarPlants();
    console.log(this.firstname);
  }

  cargarPlants(){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    console.log(this.reference);
    this.bedService.getPlants(this.reference).subscribe(resp =>{
      this.plants.push(...resp.data);
      console.log(this.plants);
      this.firstname=this.plants[0].name;
      console.log(this.firstname);
    });
  }

  getFirstName(){
    
    for (let index = 0; index < this.plants.length; index++) {
      console.log("Hola");
      console.log(this.plants[index]);
      
    }
  }

  segmentChanged(event){
    this.name = event.detail.value;
  }


}
