import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarGroundPageRoutingModule } from './editar-ground-routing.module';

import { EditarGroundPage } from './editar-ground.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarGroundPageRoutingModule
  ],
  declarations: [EditarGroundPage]
})
export class EditarGroundPageModule {}
