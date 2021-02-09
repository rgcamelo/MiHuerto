import { Component, OnInit } from '@angular/core';
import { GardenService } from '../../services/garden.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private gardenService:GardenService) {}

  ngOnInit(){
    this.cargarGardens();
  }

  cargarGardens(){
    this.gardenService.getGardens().subscribe(resp =>{
      console.log(resp);
    });
  }

}
