import { Component, OnInit } from '@angular/core';
import { GardenService } from '../../services/garden.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ground',
  templateUrl: './ground.page.html',
  styleUrls: ['./ground.page.scss'],
})
export class GroundPage implements OnInit {

  reference:string = '';
  nameHuerto:string = '';
  type:string='';
  grounds: Ground[] =[];

  constructor(private gardenService:GardenService,
    private route: ActivatedRoute ) { }

  ngOnInit(){
    this.cargarName();
    this.cargarGrounds();
  }

  cargarGrounds(){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    //console.log(this.reference);
    this.gardenService.getGrounds(this.reference).subscribe(resp =>{
      this.grounds.push(...resp.data);
      console.log(this.grounds);
    });
  }

  cargarName(){
    this.nameHuerto = this.route.snapshot.paramMap.get('name').toString();
  }

  segmentChanged(event){
    //console.log(event.detail.value);
    this.type = event.detail.value;
  }

}
