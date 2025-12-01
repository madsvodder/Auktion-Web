import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api-service';
import {Lot} from '../../interfaces/lot';
import {BidOverview} from '../../components/bid-overview/bid-overview';
import {Bid} from '../../interfaces/bid';
import {FormsModule} from '@angular/forms';
import {LoginService} from '../../services/login-service';

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

  public auctionId!: number;
  public lotNumber!: number;
  public highestBid?: number;

  public lot!: Lot;

  private route = inject(ActivatedRoute);
  public apiService = inject(ApiService);
  public loginService = inject(LoginService);

  public bidAmount: number = 1;

  ngOnInit() {
    this.auctionId = Number(this.route.snapshot.paramMap.get('id'));
    this.lotNumber = Number(this.route.snapshot.paramMap.get('lotnumber'));

    this.apiService.getLotFromAuctionId(this.auctionId, this.lotNumber).subscribe(res => {
      this.lot = res;
      console.log(res);
      this.getHighestBid()
    });
  }

  // REMEMBER TO REFRESH THIS!!!!!!
  getHighestBid() {
    this.apiService.getHighestBid(this.lot.id).subscribe({
        next: res => {

          if (res.amount === null || res.amount === 0) {
            this.highestBid = this.lot.startingPrice;
          } else {
            this.highestBid = res.amount + 1
            console.log("Highest BID", this.highestBid)
          }
        },
        error: error => {
          this.highestBid = this.lot.startingPrice;
        }
      }
    );
  }

  bidOnLot() {

    let placedBid: Bid = {
      lotId: this.lot!.id,
      userId: this.loginService.getUserId(),
      amount: this.bidAmount,
      placedAt: new Date(),
    }

    this.apiService.bidOnLot(placedBid).subscribe({
      next: res => {
        alert("Bid placed successfully")
      },
      error: (err) => {
        alert("Please login!");
      }
    });
  }
}
