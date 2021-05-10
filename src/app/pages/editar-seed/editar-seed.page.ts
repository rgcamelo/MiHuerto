import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Seed } from 'src/app/interfaces/seedInterface';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SeedService } from 'src/app/services/seed.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-editar-seed',
  templateUrl: './editar-seed.page.html',
  styleUrls: ['./editar-seed.page.scss'],
})
export class EditarSeedPage implements OnInit {

  @Input() seed:Seed;
  editSeed:Seed;
  noHayImagen = false;

  constructor(private modalCtrl:ModalController,
    private seedService:SeedService,
    public loading: LoadingService,
    private alert:AlertService,
    private camera:Camera,
    private storage:AngularFireStorage,) { }

  ngOnInit() {
    this.editSeed = {...this.seed};
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
      this.editSeed.image = `data:image/jpeg;base64,${imageData}`;
      this.noHayImagen = false;
    }, error => {
      console.log('ERROR -> ' + JSON.stringify(error));
    });
  }

  guardar(){
    this.loading.presentLoading()
    const uui = uuid.v4();
    const nombre = `${uui}.jpg`;
    const ref = this.storage.ref(`images/${nombre}`);
    const task =  ref.putString(this.editSeed.image,'data_url');

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
      this.seedService.updateSeed(this.editSeed.id.toString(),this.editSeed).subscribe(res =>{
        this.quitarImagen();
        this.loading.dismiss();
        this.modalCtrl.dismiss('Editar');
        console.log(res);
      })
    }
  }

  quitarImagen(){
    this.editSeed.image =''; 
    this.noHayImagen = true;
  }

  get igual(){
    let t = this.editSeed.name == this.seed.name && this.editSeed.image == this.seed.image;
  return t
}



}