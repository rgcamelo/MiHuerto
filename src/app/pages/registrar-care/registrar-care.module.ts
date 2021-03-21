import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarCarePageRoutingModule } from './registrar-care-routing.module';

import { RegistrarCarePage } from './registrar-care.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarCarePageRoutingModule
  ],
  declarations: [RegistrarCarePage]
})
export class RegistrarCarePageModule {}
