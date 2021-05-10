import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarSeedPageRoutingModule } from './editar-seed-routing.module';

import { EditarSeedPage } from './editar-seed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarSeedPageRoutingModule
  ],
  declarations: [EditarSeedPage]
})
export class EditarSeedPageModule {}
