import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommandeService } from '../../Services/commande.service';
import { Commande } from '../../models/commande.model';
import { SidebarComponent } from '../layout/components/sidebar/sidebar.component';
import { SessionService } from '../../Services/session.service';
import { Router, RouterModule } from '@angular/router';
import { ProfileMenuComponent } from '../layout/components/navbar/profile-menu/profile-menu.component'; // Import ProfileMenuComponent

@Component({
  selector: 'app-usercommande',
  templateUrl: './Usercommande.component.html',
  styleUrls: ['./Usercommande.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, SidebarComponent, ProfileMenuComponent]
})
export class UserCommandeComponent implements OnInit {
  commandes: Commande[] = [];
  filteredCommandes: Commande[] = [];

  constructor(
    private sessionService: SessionService,
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.sessionService.getToken();
    const userId = this.sessionService.getUserId();

    if (!token) {
      console.error('Token not found in session');
      this.router.navigate(['/auth/sign-in']);
      return;
    }

    if (userId) {
      this.getAllCommandes(userId);
    } else {
      console.error('User ID not found in session');
      this.router.navigate(['/login']);
    }
  }

  getAllCommandes(userId: string): void {
    this.commandeService.getAllCommandes().subscribe(
      data => {
        this.commandes = data;
        this.filteredCommandes = this.commandes.filter(commande => commande.userId === userId);
      },
      error => {
        console.error('Error fetching commandes', error);
      }
    );
  }

  deleteCommande(id: string): void {
    this.commandeService.deleteCommande(id).subscribe(() => {
      this.filteredCommandes = this.filteredCommandes.filter(commande => commande._id !== id);
      this.router.navigate(['/UserCommande']);

    });
  }
}
