import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Seed } from 'src/app/models/seed.model';
import { SeedService } from '../../services/seed.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window:any;
@Component({
  selector: 'app-registrar-seed',
  templateUrl: './registrar-seed.page.html',
  styleUrls: ['./registrar-seed.page.scss'],
})
export class RegistrarSeedPage implements OnInit {
  tempImage: string;

  seed:Seed = new Seed();

  constructor(private seedService:SeedService,
    private modalCtrl:ModalController,
    public loadingController: LoadingController,
    private camera:Camera) { }

  ngOnInit() {
  }

  onSubmit(formulario : NgForm){
    this.presentLoading()
    this.seed.name = this.capitalizeFirstLetter(this.seed.name);
    if(this.seed != null){
      this.seedService.createSeed(this.seed).subscribe(res =>{

        this.dismissLoading();
        this.modalCtrl.dismiss('Registrar');
        console.log(res);
      })
    }

    
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
      destinationType: this.camera.DestinationType.FILE_URI,
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
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }
    
    this.procesarImagen(options);
    
  }

  procesarImagen(options:CameraOptions){
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      console.log(img);
      this.tempImage = img;
     }, (err) => {
      // Handle error
     });
  }

  quitarImagen(){
    this.tempImage = '';
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
