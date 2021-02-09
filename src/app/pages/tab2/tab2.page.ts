import { Component, OnInit } from '@angular/core';
import { GardenService } from '../../services/garden.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  gardens : Garden[] = []

  constructor(private gardenService:GardenService) {}

  ngOnInit(){
    this.cargarGardens();
  }

  cargarGardens(){
    this.gardenService.getGardens().subscribe(resp =>{
      this.gardens.push(...resp.data);
      console.log(this.gardens);
    });
  }

}
