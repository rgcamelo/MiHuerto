import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarGardenPageRoutingModule } from './registrar-garden-routing.module';

import { RegistrarGardenPage } from './registrar-garden.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarGardenPageRoutingModule
  ],
  declarations: [RegistrarGardenPage]
})
export class RegistrarGardenPageModule {}
