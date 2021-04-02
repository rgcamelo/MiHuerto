import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },

  {
    path: 'gardens',
    loadChildren: () => import('./pages/gardens/gardens.module').then( m => m.GardensPageModule)
  },
  {
    path: 'plant',
    loadChildren: () => import('./pages/plant/plant.module').then( m => m.PlantPageModule)
  },
  {
    path: 'registrar-garden',
    loadChildren: () => import('./pages/registrar-garden/registrar-garden.module').then( m => m.RegistrarGardenPageModule)
  },
  {
    path: 'registrar-ground',
    loadChildren: () => import('./pages/registrar-ground/registrar-ground.module').then( m => m.RegistrarGroundPageModule)
  },
  {
    path: 'seed',
    loadChildren: () => import('./pages/seed/seed.module').then( m => m.SeedPageModule)
  },
  {
    path: 'registrar-plant',
    loadChildren: () => import('./pages/registrar-plant/registrar-plant.module').then( m => m.RegistrarPlantPageModule)
  },
  {
    path: 'registrar-care',
    loadChildren: () => import('./pages/registrar-care/registrar-care.module').then( m => m.RegistrarCarePageModule)
  },
  {
    path: 'editar-ground',
    loadChildren: () => import('./pages/editar-ground/editar-ground.module').then( m => m.EditarGroundPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
