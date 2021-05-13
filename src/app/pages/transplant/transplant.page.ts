import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Bed } from 'src/app/interfaces/bedInterface';
import { Garden } from 'src/app/interfaces/gardenInterface';
import { Plant } from 'src/app/interfaces/plantInterface';
import { AlertService } from 'src/app/services/alert.service';
import { BedService } from 'src/app/services/bed.service';
import { GardenService } from 'src/app/services/garden.service';
import { GroundService } from 'src/app/services/ground.service';
import { ToastService } from 'src/app/services/toast.service';
import { isNumber } from 'util';

@Component({
  selector: 'app-transplant',
  templateUrl: './transplant.page.html',
  styleUrls: ['./transplant.page.scss'],
})
export class TransplantPage implements OnInit {
  @Input() plant:Plant;
  newPlant:Plant;
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
    private groundService:GroundService,
    private bedService:BedService,
    private alert:AlertService,
    private toast:ToastService,
    private modalCtrl:ModalController,) { }

  ngOnInit() {
    this.newPlant = {...this.plant}
    this.consultarGardens();
    console.log(this.nextGround);
  }

  consultarGardens(url?:string){
    this.gardenService.getGardens(url).subscribe( res =>{
      if (res.data.length > 0){
        this.gardens.push(...res.data);
        this.nextGarden = res.meta.pagination.links.next;
      }else{
        this.toast.presentToast('No hay Huertos disponibles');
      }
      
    });
  }

  consultarGrounds(idGarden:string,url?:string){
    this.gardenService.getGrounds(idGarden,url).subscribe(res =>{
      if (res.data.length > 0){
        this.grounds.push(...res.data);
      this.nextGround = res.meta.pagination.links.next;
      }else{
        this.toast.presentToast('No hay Zonas disponibles en este Huerto');
      }
      
    });
  }

  consultarBeds(idGround:string,url?:string){
    this.groundService.getBeds(idGround,url).subscribe(res =>{
      if (res.data.length > 0) {
        this.beds.push(...res.data);
        this.nextBed = res.meta.pagination.links.next;
      }else{
        this.toast.presentToast('No hay Camas disponibles en esta Zona');
      }
      
    })
  }

  selectGarden(garden:Garden){
    this.reIniGround();
    this.reIniBed();
    this.selGarden = garden;
    this.consultarGrounds(garden.id.toString());
  }

  selectGround(ground:Ground){
    this.reIniBed();
    this.selGround = ground;
    this.consultarBeds(ground.id.toString());
  }

  selectBed(bed:Bed){
    this.selBed = bed;
  }

  onGardenScroll(event) {
    let esp = event.srcElement.scrollTop+ 400;
    let val = event.srcElement.scrollHeight;
    if(esp === val){
      console.log("entro");
      if (this.nextGarden != undefined) {
        this.consultarGardens(this.nextGarden);
      }
      
    }
  }

  onGroundScroll(event){
    let esp = event.srcElement.scrollTop+ 400;
    let val = event.srcElement.scrollHeight;
    if(esp === val){
      console.log("entro");
      if (this.nextGround != undefined) {
        this.consultarGrounds(this.selGarden.id.toString(),this.nextGround);
      }
      
    }
  }

  onBedScroll(event){
    let esp = event.srcElement.scrollTop+ 400;
    let val = event.srcElement.scrollHeight;
    if(esp === val){
      console.log("entro");
      if (this.nextBed != undefined) {
        this.consultarBeds(this.selGround.id.toString(),this.nextBed);
      }
      
    }
  }

  async transplantar(){
    const res = await this.alert.presentAlertConfirm('Atención',`¿Está seguro de trasplantar?`);
          if (res == 'ok'){
            this.update();
            this.transplante();
          }
  }

  update(){
    this.plant.quantity = this.plant.quantity - this.newPlant.quantity

    if (this.plant.quantity == 0) {
      this.plant.status = 'desplantada';
      this.bedService.updatePlant(this.plant.bed_id.toString(),this.plant.seed_id.toString(),this.plant.id.toString(),this.plant).subscribe( res =>{
      })
    }else{
      this.bedService.updatePlant(this.plant.bed_id.toString(),this.plant.seed_id.toString(),this.plant.id.toString(),this.plant).subscribe( res =>{
      })
    }
  }

  transplante() {
    this.newPlant.bed_id = this.selBed.id;
    this.newPlant.status = 'trasplantada';
    console.log(this.newPlant);
    this.bedService.updatePlant(this.plant.bed_id.toString(),this.plant.seed_id.toString(),this.plant.id.toString(),this.newPlant).subscribe( res =>{
      this.modalCtrl.dismiss('Transplantar');
    })
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }

  get invalidQuantity() {
    return this.newPlant.quantity > this.plant.quantity || this.newPlant.quantity <= 0 || !Number.isInteger(this.newPlant.quantity);
  }

  reIniGround(){
    this.grounds = [];
    this.selGround = undefined;
    this.nextGround = undefined;
  }

  reIniBed(){
    this.beds = [];
    this.selBed = undefined;
    this.nextBed = undefined
  }

}
