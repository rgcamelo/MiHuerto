import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarCarePage } from './registrar-care.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarCarePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarCarePageRoutingModule {}
