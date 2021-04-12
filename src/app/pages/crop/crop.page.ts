import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { SeedService } from '../../services/seed.service';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.page.html',
  styleUrls: ['./crop.page.scss'],
})
export class CropPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  crops: Crop[] = [];
  reference:string;
  next:string;

  constructor(private seedService:SeedService,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.cargarCrops();
  }

  cargarCrops(url?:string){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    this.seedService.getCrops(this.reference,url).subscribe( res => {
      this.crops.push(...res.data);
      this.next = res.meta.pagination.links.next;
      this.crops.sort( this.ordenar );
      this.crops.reverse();
      console.log(this.crops);
    })

    
  }

  ordenar(a:Crop,b:Crop){
    if (a.created_at > b.created_at) {
      return 1;
    }
    if (a.created_at < b.created_at) {
      return -1;
    }
    return 0;
  }

  doRefresh(event?){
    this.infiniteScroll.disabled = false;
    this.crops = [];
    this.cargarCrops();
    if (event) {
      event.target.complete();
    }
    
  }

  loadData(event){
    if (this.next) {
      this.cargarCrops(this.next);
    }else{
      this.infiniteScroll.disabled = true;
    }
    
    if (event) {
      event.target.complete();
    }
  }



}
