import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterielsComponent } from './materiels.component';
import { MaterielsRoutingModule } from './materiels-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MaterielService} from "./materiel.service";
import {QRCodeModule} from "angularx-qrcode";

@NgModule({
  imports: [
    CommonModule,
    MaterielsRoutingModule,
    HttpClientModule,
    FormsModule,
    QRCodeModule,
  ],
  declarations: [MaterielsComponent],
  providers: [MaterielService],
})
export class MaterielsModule { }
