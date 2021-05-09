import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarCarePage } from './editar-care.page';

const routes: Routes = [
  {
    path: '',
    component: EditarCarePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarCarePageRoutingModule {}
