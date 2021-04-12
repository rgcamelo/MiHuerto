import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, IonList } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Ground } from 'src/app/models/ground.model';
import { GroundService } from '../../services/ground.service';

@Component({
  selector: 'app-beds',
  templateUrl: './beds.page.html',
  styleUrls: ['./beds.page.scss'],
})
export class BedsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonList) ionList: IonList;

  reference:string = '';
  next:string;
  type:string = '';
  ground:Ground = new Ground();
  beds: Bed[] =[];

  constructor(private groundService:GroundService,
    private route: ActivatedRoute ) { }

  ngOnInit(){
    this.getGround();
    this.cargarBeds();
  }

  loadData(event){
    if (this.next) {
      this.cargarBeds(this.next);
    }else{
      this.infiniteScroll.disabled = true;
      
    }
    if (event) {
      event.target.complete();
    }
  }

  doRefresh(event?){
    this.infiniteScroll.disabled = false;
    this.beds = [];
    this.cargarBeds();
    if (event) {
      event.target.complete();
    }
  }

  cargarBeds(url?:string){
    this.groundService.getBeds(this.reference,url).subscribe(resp =>{
      this.beds.push(...resp.data);
      this.beds.sort( this.ordenar );
      this.next = resp.meta.pagination.links.next;
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
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    this.groundService.getGround(this.reference).subscribe( data =>{
      this.ground = data.data;
    });
  }

  segmentChanged(event){
    this.type = event.detail.value;
  }

  actualizar(si:boolean){
    if(si == true){
      this.doRefresh();
    }
  }

  

}
