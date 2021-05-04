import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Seed } from 'src/app/models/seed.model';
import { SeedService } from '../../services/seed.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as uuid from 'uuid';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import { File } from "@ionic-native/file/ngx";
import { finalize } from 'rxjs/operators';

declare var window:any;
@Component({
  selector: 'app-registrar-seed',
  templateUrl: './registrar-seed.page.html',
  styleUrls: ['./registrar-seed.page.scss'],
})
export class RegistrarSeedPage implements OnInit {
  tempImage: string;
  img:string;
  seed:Seed = new Seed();
  hayImagen = false;

  constructor(private seedService:SeedService,
    private modalCtrl:ModalController,
    public loadingController: LoadingController,
    private camera:Camera,
    private storage:AngularFireStorage,
    private file: File) { }

  ngOnInit() {
  }


  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
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
      this.hayImagen = true;
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
      this.seed.image = res;
      this.guardarSemilla();
    });
  }

  guardarSemilla(){
    console.log("Llego");
    this.seed.name = this.capitalizeFirstLetter(this.seed.name);
    if(this.seed != null){
      this.seedService.createSeed(this.seed).subscribe(res =>{
        this.dismissLoading();
        this.modalCtrl.dismiss('Registrar');
        console.log(res);
      })
    }
  }

  quitarImagen(){
    this.tempImage =''; 
    this.hayImagen = false;
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


}
