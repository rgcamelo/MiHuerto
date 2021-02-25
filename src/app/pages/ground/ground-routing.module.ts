import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroundPage } from './ground.page';

const routes: Routes = [
  {
    path: '',
    component: GroundPage,
    children:[
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroundPageRoutingModule {}
