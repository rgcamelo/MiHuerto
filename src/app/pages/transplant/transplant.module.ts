import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransplantPageRoutingModule } from './transplant-routing.module';

import { TransplantPage } from './transplant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransplantPageRoutingModule
  ],
  declarations: [TransplantPage]
})
export class TransplantPageModule {}
