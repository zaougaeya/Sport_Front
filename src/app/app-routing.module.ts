import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin/materiels', // Route pour la gestion des matériels
    loadChildren: () => import('./modules/Gestion_Materiel/materiels/materiels.module').then(m => m.MaterielsModule),
  },
  {
    path: 'admin/reservations', // Route pour la gestion des réservations
    loadChildren: () => import('./modules/Gestion_Materiel/Reservation/reservations.module').then(m => m.ReservationsModule),
  },
  { path: '', redirectTo: '/materiels', pathMatch: 'full' },
  {
    path: 'errors',
    loadChildren: () => import('./modules/error/error.module').then((m) => m.ErrorModule),
  },
  { path: '**', redirectTo: 'errors/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
