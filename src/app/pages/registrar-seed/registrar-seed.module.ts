import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarSeedPageRoutingModule } from './registrar-seed-routing.module';

import { RegistrarSeedPage } from './registrar-seed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarSeedPageRoutingModule
  ],
  declarations: [RegistrarSeedPage]
})
export class RegistrarSeedPageModule {}
