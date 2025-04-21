// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'; 
import { routes } from './app-routing.module'; 

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
     // <-- Importation de HttpClientModule ici
    RouterModule.forRoot(routes),
    FormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
