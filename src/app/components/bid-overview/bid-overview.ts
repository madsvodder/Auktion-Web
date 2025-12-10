import {Component, inject, Input, input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api-service';
import {Lot} from '../../interfaces/lot';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-bid-overview',
  imports: [
    DatePipe
  ],
  templateUrl: './bid-overview.html',
  styleUrl: './bid-overview.css',
})
export class BidOverview implements OnInit {
  public apiService = inject(ApiService);

  @Input() lot!: Lot;

  ngOnInit() {
    // Load all bids from current lot
    this.apiService.loadBidsFromLot(<number>this.lot?.id)

    // Join SignalR group for this lot
    this.apiService.connectToBidHub(this.lot.id);
  }

  ngOnDestroy() {
    // Leave the group when component destroyed
    if (this.lot?.id) {
      this.apiService.leaveLot(this.lot.id);
      this.apiService.disconnectBidHub();
    }
  }

  protected readonly DatePipe = DatePipe;
}
