import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router } from '@angular/router';

@Component({
    selector: '[app-event-table-item]',
    templateUrl: './event-table-item.component.html',
    standalone: true,
    imports: [AngularSvgIconModule, CurrencyPipe],
})
export class EventTableItemComponent implements OnInit {
  @Input() event = <any>{};
  @Output() deleteEvent = new EventEmitter<string>()
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

	showDetails = (): void => {
		this.router.navigate(['events/' + this.event._id]);
	};
  update = (): void => {
		this.router.navigate(['events/update/' + this.event._id]);
	};


  delete = (): void => {
		this.deleteEvent.emit(this.event._id);
	};
}
