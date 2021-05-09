import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarCarePageRoutingModule } from './editar-care-routing.module';

import { EditarCarePage } from './editar-care.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarCarePageRoutingModule,
    PipesModule,
  ],
  declarations: [EditarCarePage]
})
export class EditarCarePageModule {}
