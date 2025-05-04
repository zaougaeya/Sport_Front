import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandesComponent } from './commandes.component';


const routes: Routes = [
  {
    path: '',
    component: CommandesComponent, // Le composant qui doit être affiché pour cette route
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandesRoutingModule {}
