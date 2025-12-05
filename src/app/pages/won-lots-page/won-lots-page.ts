import {Component, OnInit} from '@angular/core';
import {Lot} from '../../interfaces/lot';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api-service';
import {switchMap} from 'rxjs';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-won-lots-page',
  imports: [
    DecimalPipe
  ],
  templateUrl: './won-lots-page.html',
  styleUrl: './won-lots-page.css',
})
export class WonLotsPage implements OnInit{

  lots: Lot[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.route.paramMap
      .pipe(
        switchMap(params => {
          const idParam = params.get('id');
          const userId = idParam ? +idParam : 0;
          return this.apiService.getWonLots(userId);
        })
      )
      .subscribe({
        next: lots => {
          this.lots = lots;
          this.loading = false;
        },
        error: err => {
          console.error(err);
          this.error = 'Kunne ikke hente vundne lots.';
          this.loading = false;
        }
      });
  }

}
