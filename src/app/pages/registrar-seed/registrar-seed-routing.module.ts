import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarSeedPage } from './registrar-seed.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarSeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarSeedPageRoutingModule {}
