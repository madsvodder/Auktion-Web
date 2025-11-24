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



  public lot!: Lot;

  private route = inject(ActivatedRoute);
  public apiService = inject(ApiService);

  public bidAmount: number = 1;

  ngOnInit() {
    const lotNumberParam = this.route.snapshot.paramMap.get('lotid');
    const lotNumber = lotNumberParam ? Number(lotNumberParam) : null;

    if (!lotNumber) {
      return;
    }

    this.apiService.getLot(lotNumber).subscribe(lot => {
      this.lot = lot;
    });
  }

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
