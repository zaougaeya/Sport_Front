// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './modules/dashboard/dashboard.module';

// Angular Material Modules
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {routes} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

// FullCalendar


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,

    // Modules Angular Material
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,

    // Modules personnalisés
    DashboardModule,



    // FullCalendar
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
