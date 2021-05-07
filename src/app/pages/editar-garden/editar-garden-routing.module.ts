import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarGardenPage } from './editar-garden.page';

const routes: Routes = [
  {
    path: '',
    component: EditarGardenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarGardenPageRoutingModule {}
