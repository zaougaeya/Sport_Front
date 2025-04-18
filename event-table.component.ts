import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { EventTableItemComponent } from '../event-table-item/event-table-item.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-event-table',
    templateUrl: './event-table.component.html',
    standalone: true,
    imports: [NgFor, EventTableItemComponent, RouterModule, FormsModule],
})
export class EventTableComponent  {
  @Input() events: any[] = [];
  @Output() searchEvent = new EventEmitter<string>()
  @Output() filterEvent = new EventEmitter<{minPrice: number, maxPrice: number}>()
  @Output() deleteEvent = new EventEmitter<string>()

  searchValue: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;



}
