import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeedPage } from './seed.page';

const routes: Routes = [
  {
    path: '',
    component: SeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeedPageRoutingModule {}
