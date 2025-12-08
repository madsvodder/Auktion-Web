import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api-service';
import {Lot} from '../../interfaces/lot';
import {BidOverview} from '../../components/bid-overview/bid-overview';
import {Bid} from '../../interfaces/bid';
import {FormsModule} from '@angular/forms';
import {LoginService} from '../../services/login-service';
import {TokenService} from '../../services/token-service';

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

  lot: Lot | null = null;

  private route = inject(ActivatedRoute);
  public apiService = inject(ApiService);
  public loginService = inject(LoginService);
  public tokenService = inject(TokenService);

  public bidAmount: number = 1;

  selectedImage: string | null = null;

  selectImage(url: string) {
    this.selectedImage = url;
  }

  ngOnInit() {
    this.auctionId = Number(this.route.snapshot.paramMap.get('id'));
    this.lotNumber = Number(this.route.snapshot.paramMap.get('lotnumber'));

    this.apiService.getLotFromAuctionId(this.auctionId, this.lotNumber).subscribe(res => {
      this.lot = res;
      console.log(res);
      this.getHighestBid()
    });

    this.tokenService.checkToken()
  }

  // REMEMBER TO REFRESH THIS!!!!!!
  getHighestBid() {
    if (!this.lot) {
      return;
    }

    this.apiService.getHighestBid(this.lot.id).subscribe({
      next: res => {
        if (res.amount === null || res.amount === 0) {
          this.highestBid = this.lot!.startingPrice;
        } else {
          this.highestBid = res.amount + 1;
          console.log('Highest BID', this.highestBid);
        }
      },
      error: () => {
        this.highestBid = this.lot!.startingPrice;
      }
    });
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
