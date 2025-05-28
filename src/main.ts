import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// ✅ Import du module LucideAngular et des icônes depuis 'lucide'
import { LucideAngularModule } from 'lucide-angular';
import { ShoppingCart, CheckCircle, XCircle } from 'lucide'; // ✅ depuis 'lucide' et non 'lucide-angular/icons'

if (environment.production) {
  enableProdMode();
  if (window) {
    selfXSSWarning();
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      // ✅ Fournir les icônes ici avec LucideAngularModule.pick()
      LucideAngularModule.pick({
        ShoppingCart,
        CheckCircle,
        XCircle,
      }),
    ),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));

function selfXSSWarning() {
  setTimeout(() => {
    console.log(
      '%c** STOP **',
      'font-weight:bold; font: 2.5em Arial; color: white; background-color: #e11d48; padding: 10px; border-radius: 15px;',
    );
    console.log(
      `%cThis is a browser feature intended for developers. Using this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS. Do not enter or paste code that you do not understand.`,
      'font-weight:bold; font: 1.5em Arial; color: #e11d48;',
    );
  });
}
