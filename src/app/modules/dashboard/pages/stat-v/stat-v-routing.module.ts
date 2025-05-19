import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatVComponent } from './stat-v.component';

const routes: Routes = [
  {
    path: '',
    component: StatVComponent, 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class statvRoutingModule {}
