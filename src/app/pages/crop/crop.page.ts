import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { PlantService } from 'src/app/services/plant.service';
import { ToastService } from 'src/app/services/toast.service';
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
    private route: ActivatedRoute,
    private plantService:PlantService,
    private alert:AlertService,
    private toast:ToastService,) { }

  ngOnInit() {
    this.cargarCrops();
  }

  cargarCrops(url?:string){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    this.seedService.getCrops(this.reference,url).subscribe( res => {
      if (res.data.length > 0) {
        this.crops.push(...res.data);
        this.next = res.meta.pagination.links.next;
        console.log(this.crops);
      }
      
    })

    
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

  async deleteCrop(crop:Crop){
    const res = await this.alert.presentAlertConfirm('Atención',`Esta acción eliminara este registro de cosecha, ¿Desea continuar?`);
    if(res == 'ok'){
      this.plantService.deleteCrop(crop.plant.toString(),crop.id.toString()).subscribe( res =>{
      this.toast.presentToast('Cosecha borrada del registro');
      this.doRefresh();
      });
    }
  }



}
