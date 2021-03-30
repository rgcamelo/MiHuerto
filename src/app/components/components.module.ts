import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BedItemComponent } from './bed-item/bed-item.component';
import { PlantItemComponent } from './plant-item/plant-item.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
      BedItemComponent,
      PlantItemComponent,
  ],
  exports:[
      BedItemComponent,
      PlantItemComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }