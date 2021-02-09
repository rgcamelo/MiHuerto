import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BedsPage } from './beds.page';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: BedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),ComponentsModule],
  exports: [RouterModule],
})
export class BedsPageRoutingModule {}
