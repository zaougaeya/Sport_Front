import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'categories',
    loadChildren: () => import('./modules/categories/categories.module').then(m => m.CategoriesModule),
  },
  
  {
    path: 'produits',
    loadChildren: () => import('./modules/produits/produits.module').then(m => m.ProduitsModule),
  },
  {
    path: 'commandes',
    loadChildren: () => import('./modules/commandes/commandes.module').then(m => m.CommandesModule),
  },
  
  {
    path: 'errors',
    loadChildren: () => import('./modules/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: '**',
    redirectTo: 'errors/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
