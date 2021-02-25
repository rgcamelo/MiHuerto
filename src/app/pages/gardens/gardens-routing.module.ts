import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GardensPage } from './gardens.page';

const routes: Routes = [
  {
    path: '',
    component: GardensPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GardensPageRoutingModule {}
