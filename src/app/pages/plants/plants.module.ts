import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlantsPageRoutingModule } from './plants-routing.module';

import { PlantsPage } from './plants.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlantsPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [PlantsPage]
})
export class PlantsPageModule {}
