import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarGardenPageRoutingModule } from './editar-garden-routing.module';

import { EditarGardenPage } from './editar-garden.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarGardenPageRoutingModule
  ],
  declarations: [EditarGardenPage]
})
export class EditarGardenPageModule {}
