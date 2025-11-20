import {Component, inject, OnInit} from '@angular/core';
import {Auction} from '../../interfaces/auction';
import {ApiService} from '../../services/api-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lots-page',
  standalone: true,
  imports: [],
  templateUrl: './auction-view.html',
  styleUrl: './auction-view.css',
})
export class AuctionView implements OnInit {

  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  auction: Auction | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.auction = this.apiService
        .auctions()
        .find(a => a.id.toString() === id) ?? null;
    }
  }
}
