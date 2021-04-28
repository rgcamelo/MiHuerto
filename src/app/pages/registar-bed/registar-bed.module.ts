import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistarBedPageRoutingModule } from './registar-bed-routing.module';

import { RegistarBedPage } from './registar-bed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistarBedPageRoutingModule
  ],
  declarations: [RegistarBedPage]
})
export class RegistarBedPageModule {}
