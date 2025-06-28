import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivreursComponent } from './livreurs.component';

const routes: Routes = [
  {
    path: '',
    component: LivreursComponent, 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivreursRoutingModule {}
