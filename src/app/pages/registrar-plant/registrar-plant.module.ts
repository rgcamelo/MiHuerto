import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarPlantPageRoutingModule } from './registrar-plant-routing.module';

import { RegistrarPlantPage } from './registrar-plant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarPlantPageRoutingModule
  ],
  declarations: [RegistrarPlantPage]
})
export class RegistrarPlantPageModule {}
