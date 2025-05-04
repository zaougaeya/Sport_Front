import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PanierService } from '../../../Services/panier.service';
import { CommandeService } from '../../../Services/commande.service';
import { Panier } from '../../../models/panier.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../layout/components/sidebar/sidebar.component';
import { SessionService } from '../../../Services/session.service';
import { NavbarComponent } from '../../layout/components/navbar/navbar.component';

@Component({
  selector: 'app-panier',
  templateUrl: './userpanier.component.html',
  styleUrls: ['./userpanier.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SidebarComponent,
    NavbarComponent 
  ],
})
export class UserPanierComponent implements OnInit {
  panier: Panier | null = null;
  addItemForm: FormGroup;
  displayedColumns: string[] = ['productId', 'quantity', 'price', 'actions'];

  constructor(
    private panierService: PanierService,
    private commandeService: CommandeService,
    private sessionService: SessionService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.addItemForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    const token = this.sessionService.getToken();
    if (!token) {
      console.error('Token not found in session');
      this.router.navigate(['/auth/sign-in']);
      return;
    }
    this.getPanier(token);
  }

  getPanier(token: string): void {
    this.panierService.getPanier().subscribe(
      data => {
        this.panier = data;
      },
      error => {
        console.error('Error fetching panier', error);
      }
    );
  }

  updatePanier(): void {
    if (this.panier) {
      this.panierService.updatePanier(this.panier).subscribe(
        data => {
          console.log('Panier updated', data);
        },
        error => {
          console.error('Error updating panier', error);
        }
      );
    }
  }

  increaseQuantity(productId: string): void {
    if (this.panier) {
      const item = this.panier.items.find(item => item.productId === productId);
      if (item) {
        item.quantity += 1;
        this.panier.totalPrice += item.prix;
        this.updatePanier();
      }
    }
  }

  decreaseQuantity(productId: string): void {
    if (this.panier) {
      const item = this.panier.items.find(item => item.productId === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        this.panier.totalPrice -= item.prix;
        this.updatePanier();
      }
    }
  }

  removeItemFromPanier(productId: string): void {
    if (this.panier) {
      const itemIndex = this.panier.items.findIndex(item => item.productId === productId);
      if (itemIndex > -1) {
        const item = this.panier.items[itemIndex];
        this.panier.totalPrice -= item.quantity * item.prix;
        this.panier.items.splice(itemIndex, 1);
        this.panierService.updatePanier(this.panier).subscribe(
          data => {
            console.log('Item removed from panier', data);
          },
          error => {
            console.error('Error removing item from panier', error);
          }
        );
      }
    }
  }

  generateQRCode(): void {
    if (this.panier) {
      this.panierService.generateQRCode(this.panier._id).subscribe(
        data => {
          console.log('QR code generated', data);
        },
        error => {
          console.error('Error generating QR code', error);
        }
      );
    }
  }

  convertToCommande(): void {
     if (this.panier) {
      const panierId = this.panier._id;
      const userids = this.panier.userId;

      if (panierId) {
        this.commandeService.createCommande({ userId: this.panier.userId, panierId }).subscribe(
          data => {
            console.log('Commande created', data);
            this.clearPanier(userids);
            this.router.navigate(['/UserCommande']);
          },
          error => {
            console.error('Error creating commande', error);
          }
        );
      } else {
        console.error('Panier ID is null or undefined');
      }
    } else {
      console.error('Panier object is null or undefined');
    }
  }

  clearPanier(panierId: string): void {
    this.panierService.clearPanier(panierId).subscribe(
      () => {
        console.log('Panier cleared');
        this.panier = null;
      },
      error => {
        console.error('Error clearing panier', error);
      }
    );
  }

  clearSession(): void {
    this.sessionService.clearSession();
    this.router.navigate(['/login']);
  }
 
}
