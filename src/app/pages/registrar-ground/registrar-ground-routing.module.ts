import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarGroundPage } from './registrar-ground.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarGroundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarGroundPageRoutingModule {}
