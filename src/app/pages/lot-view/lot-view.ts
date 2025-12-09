import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api-service';
import {Lot} from '../../interfaces/lot';
import {BidOverview} from '../../components/bid-overview/bid-overview';
import {Bid} from '../../interfaces/bid';
import {FormsModule} from '@angular/forms';
import {LoginService} from '../../services/login-service';
import {TokenService} from '../../services/token-service';
import {BidDto} from '../../dto/bid-dto';

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

  // Countdown!
  countdown: string = '';
  private countdownIntervalId: any;

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
      this.startCountdown();
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

    let placedBid: BidDto = {
      lotId: this.lot!.id,
      userId: this.loginService.getUserId(),
      amount: this.bidAmount,
      placedAt: new Date(),
      username: this.loginService.getUsername(),
    }

    this.apiService.bidOnLot(placedBid).subscribe({
      next: res => {
        // refresh highest bid
        this.getHighestBid();
      },
      error: (err) => {
        alert("Please login or refresh!");
      }
    });
  }

  private startCountdown() {
    if (!this.lot?.endTime) return;

    const endTimeMs = new Date(this.lot.endTime).getTime();

    // run once immediately
    this.updateCountdown(endTimeMs);

    // then every second
    this.countdownIntervalId = setInterval(() => {
      this.updateCountdown(endTimeMs);
    }, 1000);
  }

  private updateCountdown(endTimeMs: number) {
    const now = Date.now();
    const diff = endTimeMs - now;

    if (diff <= 0) {
      this.countdown = 'Auktionen er slut';
      if (this.countdownIntervalId) {
        clearInterval(this.countdownIntervalId);
      }
      return;
    }

    const hours = Math.floor(diff / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);
    const seconds = Math.floor((diff % 60_000) / 1000);

    this.countdown = `${hours}t ${minutes}m ${seconds}s`;
  }
}
