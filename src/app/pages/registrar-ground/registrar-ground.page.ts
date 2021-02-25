import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-ground',
  templateUrl: './registrar-ground.page.html',
  styleUrls: ['./registrar-ground.page.scss'],
})
export class RegistrarGroundPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  cancelar(){
    this.modalCtrl.dismiss('Cancelar');
  }

}
