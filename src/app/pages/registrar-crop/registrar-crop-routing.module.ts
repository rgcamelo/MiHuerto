import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarCropPage } from './registrar-crop.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarCropPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarCropPageRoutingModule {}
