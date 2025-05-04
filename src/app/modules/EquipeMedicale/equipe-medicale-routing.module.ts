import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEquipeComponent } from './components/add-equipe/add-equipe.component';

const routes: Routes = [
  { path: 'add', component: AddEquipeComponent }  // localhost:4200/equipeMedicale/add
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipeMedicaleRoutingModule {}
