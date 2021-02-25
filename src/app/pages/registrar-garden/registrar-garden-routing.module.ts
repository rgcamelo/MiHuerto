import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarGardenPage } from './registrar-garden.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarGardenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarGardenPageRoutingModule {}
