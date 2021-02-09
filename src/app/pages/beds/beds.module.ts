import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BedsPageRoutingModule } from './beds-routing.module';

import { BedsPage } from './beds.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    BedsPageRoutingModule
  ],
  declarations: [BedsPage]
})
export class BedsPageModule {}
