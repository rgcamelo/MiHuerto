import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistarBedPage } from './registar-bed.page';

const routes: Routes = [
  {
    path: '',
    component: RegistarBedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistarBedPageRoutingModule {}
