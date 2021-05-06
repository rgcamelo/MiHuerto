import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { GardenService } from 'src/app/services/garden.service';
import { Garden } from '../../models/garden.model';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as uuid from 'uuid';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registrar-garden',
  templateUrl: './registrar-garden.page.html',
  styleUrls: ['./registrar-garden.page.scss'],
})
export class RegistrarGardenPage implements OnInit {

  noHayImagen = true;
  tempImage: string;

  garden:Garden = new Garden();

  constructor(private modalCtrl: ModalController,
    private gardenService:GardenService,
    public loadingController: LoadingController,
    private camera:Camera,
    private storage:AngularFireStorage, ) { }

  ngOnInit() {
  }

  onSubmit(formulario : NgForm){
    this.presentLoading();
    if(this.garden != null){
      this.gardenService.createGarden(this.garden).subscribe(res =>{
        
        console.log(res);
        this.modalCtrl.dismiss('Registrar');
        this.dismissLoading();
      })
    }

    
  }

  camara(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    }

    this.procesarImagen(options);
    
  }

  libreria(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }

    this.procesarImagen(options);

  }

  procesarImagen(options:CameraOptions){
    this.camera.getPicture(options).then((imageData) => {
      this.tempImage = `data:image/jpeg;base64,${imageData}`;
      this.noHayImagen = false;
    }, error => {
      console.log('ERROR -> ' + JSON.stringify(error));
    });
  }

  guardar(){
    this.presentLoading()
    const uui = uuid.v4();
    const nombre = `${uui}.jpg`;
    const ref = this.storage.ref(`images/${nombre}`);
    const task =  ref.putString(this.tempImage,'data_url');

    task.snapshotChanges()
  .pipe(
    finalize(() => {
      console.log("Finalizo...");
      this.obtenerUrl(ref);
    })
  ).subscribe();
  }

  obtenerUrl(ref:AngularFireStorageReference){
    ref.getDownloadURL().subscribe( res => {
      this.garden.image = res;
      this.guardarJardin();
    });
  }

  guardarJardin(){
    console.log("Llego");
    if(this.garden != null){
      this.gardenService.createGarden(this.garden).subscribe(res =>{
        this.quitarImagen();
        this.dismissLoading();
        this.modalCtrl.dismiss('Registrar');
      })
    }
  }

  quitarImagen(){
    this.tempImage =''; 
    this.noHayImagen = true;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
  }

  async dismissLoading(){
    return await this.loadingController.dismiss();
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }

}

