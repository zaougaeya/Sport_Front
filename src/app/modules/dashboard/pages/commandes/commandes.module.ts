import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommandesRoutingModule } from './commandes-routing.module';
import { CommandeService } from './commande.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule ,
     CommandesRoutingModule,
  ],
   providers: [CommandeService],
})
export class CommandesModule { }
