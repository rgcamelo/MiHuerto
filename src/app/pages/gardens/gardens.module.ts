import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GardensPageRoutingModule } from './gardens-routing.module';

import { GardensPage } from './gardens.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GardensPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GardensPage]
})
export class GardensPageModule {}
