import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, IonList, ModalController } from '@ionic/angular';
import { Bed } from 'src/app/interfaces/bedInterface';
import { Ground } from 'src/app/models/ground.model';
import { GroundService } from '../../services/ground.service';
import { RegistarBedPage } from '../registar-bed/registar-bed.page';

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
    private route: ActivatedRoute,
    private modalCtrl: ModalController ) { }

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
      if (resp.data.length > 0) {
        this.beds.push(...resp.data);
      this.next = resp.meta.pagination.links.next;
      }
      
    });
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

  async registrarBed(tipo:string){
    const modal = await this.modalCtrl.create({
      component: RegistarBedPage,
      componentProps:{
        'ground' : this.ground,
        'tipo' : tipo,
      }
    });
    await modal.present();

    await modal.onDidDismiss().then( () => {
      this.doRefresh();
    });
  }

  

}
