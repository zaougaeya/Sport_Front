import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { NgIf } from '@angular/common';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [NgIf, RouterModule, FormsModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './event-form.component.html',
})
export class EventFormComponent implements OnInit {
  eventId: string | null = null;
  @Input() isEditMode = false;
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      eventname: ['', Validators.required],
      descevent: ['', Validators.required],
      catevent: ['', Validators.required],
      picturevent: ['', [Validators.required]],
      prixevent: ['', Validators.required],
      //local: ['', Validators.required],
      numberOfPerson: ['', Validators.required, Validators.min(1)]
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.isEditMode = true;
      this.eventService.getOneById(this.eventId).subscribe((event: any) => {
        this.eventForm.patchValue(event);
      });
    }
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.eventService.update(this.eventId!, this.eventForm.value).subscribe(
        () => {
          this.router.navigate(['/events']);
        },
        (error: any) => {
          console.error('Error updating event', error);
        }
      );
    } else {
      this.eventService.create(this.eventForm.value).subscribe(
        () => {
          this.router.navigate(['/events']);
        },
        (error: any) => {
          console.error('Error creating event', error);
        }
      );
    }
  }
}
