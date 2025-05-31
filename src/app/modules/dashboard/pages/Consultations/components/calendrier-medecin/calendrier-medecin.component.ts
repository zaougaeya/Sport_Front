import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreneauReservationService } from '../../services/creneau-reservation.service';
//import { CalendarOptions } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EventInput } from '@fullcalendar/core';

import { UserService } from '../../../users/services/user.service';

@Component({
  selector: 'app-calendrier-medecin',
  templateUrl: './calendrier-medecin.component.html',
  styleUrl: './calendrier-medecin.component.scss'
})

  export class CalendrierMedecinComponent implements OnInit {
 medecins: { id: string, name: string }[] = [];
  selectedMedecinId: string | null = null;
  isLoading: boolean = false;
calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,listWeek'
  },
  events: [],
  eventDisplay: 'block',
  eventTextColor: '#fff',
  

  eventDidMount: (info) => {
    const start = info.event.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const end = info.event.end?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    (info.el as HTMLElement).title = `${info.event.title}\n${start} - ${end}`;
  },

  // ✨ Add this hook to highlight weekends
dayCellClassNames: (arg) => {
    const day = arg.date.getDay(); // 0 = Sunday, 6 = Saturday
    return (day === 0 || day === 6) ? ['weekend-highlight'] : [];
  }
};
  constructor(
    private userService: UserService,
    private creneauService: CreneauReservationService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.medecins = users.map(user => ({
        id: user.id,
        name: `${user.nom} ${user.prenom}`
      }));
    });
  }

  onMedecinChange(): void {
    if (this.selectedMedecinId) {
      this.isLoading = true;
      this.creneauService.getOccupiedByMedecin(this.selectedMedecinId).subscribe(creneaux => {
        const events: EventInput[] = creneaux.map(c => ({
        title: c.disponible
  ? `✅ ${c.heureDebut} - ${c.heureFin}`
  : `❌ Occupé`,
          start: `${c.date}T${c.heureDebut}`,
          end: `${c.date}T${c.heureFin}`,
          color: c.disponible ? '#28a745' : '#dc3545'
        }));

        this.calendarOptions = {
          ...this.calendarOptions,
          events
        };

        this.isLoading = false;
      }, error => {
        console.error('Error loading creneaux:', error);
        this.isLoading = false;
      });
    } else {
      this.calendarOptions.events = [];
    }
  }
}