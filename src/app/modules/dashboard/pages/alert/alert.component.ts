import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  // styleUrls: ['./alert.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,

})
export class AlertComponent implements OnInit {
  @Input() message: string = '';  // Le message d'alerte
  @Input() type: 'success' | 'error' = 'success';  // Type d'alerte: succès ou erreur
  @Output() closeAlert = new EventEmitter<void>();  // Événement pour fermer l'alerte
  @Input() duration: number = 3000; // Durée avant disparition automatique (en ms)


  ngOnInit() {
    // Disparaît après 3 secondes
    setTimeout(() => this.close(), this.duration);

  }


  close() {
    this.closeAlert.emit();  // Fermer l'alerte
  }
}
