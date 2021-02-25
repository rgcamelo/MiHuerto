import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GroundService } from '../../services/ground.service';

@Component({
  selector: 'app-beds',
  templateUrl: './beds.page.html',
  styleUrls: ['./beds.page.scss'],
})
export class BedsPage implements OnInit {

  reference:string = '';
  type:string = '';
  nameg:string='Camas';
  typeg:string='';
  ground:Ground;
  beds: Bed[] =[];

  constructor(private groundService:GroundService,
    private route: ActivatedRoute ) { }

  ngOnInit(){
    this.cargarBeds();
    this.getGround();
    
  }

  cargarBeds(){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    console.log(this.reference);
    this.groundService.getBeds(this.reference).subscribe(resp =>{
      this.beds.push(...resp.data);
      console.log(this.beds);
    });
  }

  getGround(){
    this.groundService.getGround(this.reference).subscribe( data =>{
      this.nameg = data.name;
    });
    console.log(this.nameg);
  }

  segmentChanged(event){
    this.type = event.detail.value;
  }

}
