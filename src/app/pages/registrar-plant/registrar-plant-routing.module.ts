import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarPlantPage } from './registrar-plant.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarPlantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarPlantPageRoutingModule {}
