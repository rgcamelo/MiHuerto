import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarGroundPageRoutingModule } from './registrar-ground-routing.module';

import { RegistrarGroundPage } from './registrar-ground.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarGroundPageRoutingModule
  ],
  declarations: [RegistrarGroundPage]
})
export class RegistrarGroundPageModule {}
