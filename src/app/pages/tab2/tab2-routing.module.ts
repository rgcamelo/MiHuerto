import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
    children:[
      {
        path: '',
        loadChildren: () => import('../gardens/gardens.module').then( m => m.GardensPageModule)
      },
      {
        path: 'grounds/:id',
        loadChildren: () => import('../ground/ground.module').then( m => m.GroundPageModule),
      },
      {
        path: 'grounds/:id/beds/:id',
        loadChildren: () => import('../beds/beds.module').then( m => m.BedsPageModule)
      },    
  {
    path: 'grounds/:id/beds/:id/plants/:id',
    loadChildren: () => import('../plants/plants.module').then( m => m.PlantsPageModule)
  },
  {
    path: 'grounds/:id/beds/:id/plants/:id/plant/:id',
    loadChildren: () => import('../plant/plant.module').then( m => m.PlantPageModule)
  },
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
