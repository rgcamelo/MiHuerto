import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarSeedPage } from './editar-seed.page';

const routes: Routes = [
  {
    path: '',
    component: EditarSeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarSeedPageRoutingModule {}
