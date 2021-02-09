import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BedItemComponent } from './bed-item/bed-item.component';

@NgModule({
  declarations: [
      BedItemComponent
  ],
  exports:[
      BedItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }