import { Component, OnInit } from '@angular/core';
import { Bed } from 'src/app/interfaces/bedInterface';
import { Garden } from 'src/app/interfaces/gardenInterface';
import { GardenService } from 'src/app/services/garden.service';
import { GroundService } from 'src/app/services/ground.service';

@Component({
  selector: 'app-transplant',
  templateUrl: './transplant.page.html',
  styleUrls: ['./transplant.page.scss'],
})
export class TransplantPage implements OnInit {
  gardens:Garden[] = [];
  grounds:Ground[] = [];
  beds:Bed[] = [];

  selGarden:Garden;
  selGround:Ground;
  selBed:Bed;

  nextGarden:string;
  nextGround:string;
  nextBed:string;


  constructor(private gardenService:GardenService,
    private groundService:GroundService) { }

  ngOnInit() {
    this.consultarGardens();
  }

  consultarGardens(){
    this.gardenService.getGardens().subscribe( res =>{
      this.gardens = res.data;
      this.nextGarden = res.meta.pagination.links.next;
    });
  }

  consultarGrounds(idGarden:string,url?:string){
    this.gardenService.getGrounds(idGarden,url).subscribe(res =>{
      this.grounds = res.data;
      this.nextGround = res.meta.pagination.links.next;
    });
  }

  consultarBeds(idGround:string,url?:string){
    this.groundService.getBeds(idGround,url).subscribe(res =>{
      this.beds.push(...res.data);
      this.nextBed = res.meta.pagination.links.next;
    })
  }

  selectGarden(garden:Garden){
    this.beds = [];
    this.selGarden = garden;
    this.consultarGrounds(garden.id.toString());
  }

  selectGround(ground:Ground){
    this.selGround = ground;
    this.consultarBeds(ground.id.toString());
  }

  onScroll(event){
    console.log(event.srcElement.scrollTop);
    console.log(event.srcElement.scrollHeight);
    console.log(event);
    let esp = event.srcElement.scrollTop+ 400;
    let val = event.srcElement.scrollHeight;
    if(esp === val){
      console.log("entro");
      if (this.nextBed != null) {
        this.consultarBeds(this.selGround.id.toString(),this.nextBed);
      }
      
    }
  }

}
