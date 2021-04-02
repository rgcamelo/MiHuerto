import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarGroundPage } from './editar-ground.page';

const routes: Routes = [
  {
    path: '',
    component: EditarGroundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarGroundPageRoutingModule {}
