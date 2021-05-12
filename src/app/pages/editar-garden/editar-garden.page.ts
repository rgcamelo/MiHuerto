import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Garden } from 'src/app/interfaces/gardenInterface';
import { Garden as Jardin } from 'src/app/models/garden.model';
import { AlertService } from 'src/app/services/alert.service';
import { GardenService } from 'src/app/services/garden.service';
import { LoadingService } from 'src/app/services/loading.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-editar-garden',
  templateUrl: './editar-garden.page.html',
  styleUrls: ['./editar-garden.page.scss'],
})
export class EditarGardenPage implements OnInit {
  @Input() garden:Garden;
  tempImage:string;
  noHayImagen = false;
  editGarden:Garden;

  constructor(
    private modalCtrl: ModalController,
    private camera:Camera,
    private storage:AngularFireStorage,
    private loading:LoadingService,
    private gardenService:GardenService,
    private alert:AlertService,
  ) { }

  ngOnInit() {
    console.log(this.garden);
    this.tempImage = this.garden.image;
    this.editGarden = {...this.garden};
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

  async editar(){
    const res = await this.alert.presentAlertConfirm('Atención',`¿Esta seguro de editar este huerto?`);
    if (res == 'ok'){
      this.loading.presentLoading()
      if (this.garden.name != this.editGarden.name) {
        this.guardarJardin();
      }
      if (this.tempImage != this.garden.image) {
        await this.borraimagenActual();
        this.guardar();
      }
    }
    
  }

  async borraimagenActual(){
    const ref = this.storage.refFromURL(this.garden.image);
    const borrar = await ref.delete().toPromise();
  }

  guardar(){
    
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
      this.editGarden.image = res;
      this.guardarJardin();
    });
  }

  async guardarJardin(){
    if(this.editGarden != null){
      this.gardenService.updateGarden(this.garden.id.toString(),this.editGarden).subscribe(res =>{
      this.quitarImagen();
      this.loading.dismiss();
      this.modalCtrl.dismiss('Editar');
      })
    }

    
    
  }

  quitarImagen(){
    this.tempImage = this.garden.image; 
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }

  get igual(){
    let t = this.tempImage == this.garden.image && this.editGarden.name == this.garden.name;
  return t
}

}
