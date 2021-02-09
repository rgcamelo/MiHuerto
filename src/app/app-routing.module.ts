import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'grounds/:name/:id',
    loadChildren: () => import('./pages/ground/ground.module').then( m => m.GroundPageModule)
  },
  {
    path: 'beds/:id',
    loadChildren: () => import('./pages/beds/beds.module').then( m => m.BedsPageModule)
  },
  {
    path: 'plants/:id',
    loadChildren: () => import('./pages/plants/plants.module').then( m => m.PlantsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
