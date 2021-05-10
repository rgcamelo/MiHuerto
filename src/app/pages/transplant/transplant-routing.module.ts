import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransplantPage } from './transplant.page';

const routes: Routes = [
  {
    path: '',
    component: TransplantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransplantPageRoutingModule {}
