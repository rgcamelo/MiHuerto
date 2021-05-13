import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarCropPageRoutingModule } from './registrar-crop-routing.module';

import { RegistrarCropPage } from './registrar-crop.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarCropPageRoutingModule,
    PipesModule,
  ],
  declarations: [RegistrarCropPage]
})
export class RegistrarCropPageModule {}
