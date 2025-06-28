import { NgModule } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ShoppingCart, CheckCircle, XCircle } from 'lucide';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      ShoppingCart,
      CheckCircle,
      XCircle,
    }),
  ],
  exports: [LucideAngularModule],
})
export class LucideIconsModule {}
