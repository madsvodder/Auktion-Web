import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api-service';
import {Lot} from '../../interfaces/lot';
import {BidOverview} from '../../components/bid-overview/bid-overview';
import {Bid} from '../../interfaces/bid';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-lot-view',
  imports: [
    BidOverview,
    FormsModule
  ],
  templateUrl: './lot-view.html',
  styleUrl: './lot-view.css',
})
export class LotView implements OnInit {

  auctionId!: number;
  lotNumber!: number;

  public lot!: Lot;

  private route = inject(ActivatedRoute);
  public apiService = inject(ApiService);

  public bidAmount: number = 1;

  ngOnInit() {
    this.auctionId = Number(this.route.snapshot.paramMap.get('id'));
    this.lotNumber = Number(this.route.snapshot.paramMap.get('lotnumber'));

    // Refresh lots in current auction
    this.apiService.loadLotsFromAuction(this.auctionId);

    const checkLot = () => {
      const lots = this.apiService.lots();
      this.lot = <Lot>lots.find(l => l.lotNumber === this.lotNumber);
    };

    // run once
    checkLot();  }

  bidOnLot() {

    let placedBid: Bid = {
      lotId: this.lot!.id,
      userId: "mads",
      amount: this.bidAmount,
      placedAt: new Date(),
    }

    this.apiService.bidOnLot(placedBid)
  }
}
