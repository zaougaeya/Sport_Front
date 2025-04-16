import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalService } from '../../services/local.service';
import { Local } from '../../models/local.model';

@Component({
  selector: 'app-local-detail',
  templateUrl: './local-detail.component.html',
  //styleUrls: ['./local-detail.component.css']
})
export class LocalDetailComponent implements OnInit {
  @Input() local: any;

  constructor(
    private route: ActivatedRoute,
    private localService: LocalService
  ) { }

  ngOnInit(): void {
    this.getLocal();
  }

  getLocal(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.localService.getLocalById(id).subscribe(
        (data: any) => {
          this.local = data;
        },
        (error: any) => {
          console.error('Error fetching local details', error);
        }
      );
    } else {
      console.error('Invalid local ID');
    }
  }
}
