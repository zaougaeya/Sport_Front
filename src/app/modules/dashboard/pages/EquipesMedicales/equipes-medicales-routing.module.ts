import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipesMedicalesComponent } from './components/equipes-medicales/equipes-medicales.component';
import { ListEquipesComponent } from './components/list-equipes/list-equipes.component';
import { UpdateEquipeComponent } from './components/update-equipe/update-equipe.component';

const routes: Routes = [
  { path: '', component: EquipesMedicalesComponent },
  { path: 'list', component: ListEquipesComponent },
  { path: 'update/:id', component: UpdateEquipeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipesMedicalesRoutingModule { }
