import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonList } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Ground } from 'src/app/models/ground.model';
import { GroundService } from '../../services/ground.service';

@Component({
  selector: 'app-beds',
  templateUrl: './beds.page.html',
  styleUrls: ['./beds.page.scss'],
})
export class BedsPage implements OnInit {

  @ViewChild(IonList) ionList: IonList;

  reference:string = '';
  type:string = '';
  ground:Ground = new Ground();
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
      this.beds = [...resp.data];
      this.beds.sort( this.ordenar );
      console.log(this.beds);
    });
  }

  ordenar(a:Bed,b:Bed){
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  }

  getGround(){
    this.groundService.getGround(this.reference).subscribe( data =>{
      this.ground = data.data;
    });
  }

  segmentChanged(event){
    this.type = event.detail.value;
  }

  async doRefresh( event){
    console.log(event);
    await this.cargarBeds();
    event.target.complete();
  }

}
