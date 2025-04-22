import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterielsComponent } from './materiels.component';

const routes: Routes = [
  {
    path: '',
    component: MaterielsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterielsRoutingModule { }
