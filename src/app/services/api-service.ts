import {Injectable, signal} from '@angular/core';
import {Auction} from '../interfaces/auction';
import {HttpClient} from '@angular/common/http';
import {Lot} from '../interfaces/lot';
import {Bid} from '../interfaces/bid';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  // API Urls
  private getAuctionsUrl = "http://localhost:5264/api/Auction"
  private getLotsUrl = "http://localhost:5264/api/Lot"
  private getLotsFromAuctionUrl = "http://localhost:5264/api/Lot/auction/"
  private getBidsFromLotUrl = "http://localhost:5264/api/Bid/lot/"
  private placeBidUrl = "http://localhost:5264/api/Bid"
  private getLotFromAuctionIdUrl = "http://localhost:5264/api/Lot/"
  private getAuctionUrl = "http://localhost:5264/api/Auction/"

  // Lists
  auctions = signal<Auction[]>([]);
  lots = signal<Lot[]>([]);
  bidsInCurrentLot = signal<Bid[]>([]);

  constructor(private http: HttpClient) {}

  loadAuctions() {
    this.http.get<Auction[]>(this.getAuctionsUrl).subscribe(res => {
      this.auctions.set(res);
    });
  }

  loadAllLots() {
    this.http.get<Lot[]>(this.getLotsUrl).subscribe(res => {
      this.lots.set(res);
    });
  }

  loadLotsFromAuction(id: number) {
    this.http.get<Lot[]>(this.getLotsFromAuctionUrl + id).subscribe(res => {
      this.lots.set(res);
    });
  }

  loadBidsFromLot(lotId: number) {
    this.http.get<Bid[]>(this.getBidsFromLotUrl + lotId).subscribe(res => {
      this.bidsInCurrentLot.set(res);
    })
  }

  bidOnLot(bidInput: Bid) {
    this.http.post(this.placeBidUrl, bidInput).subscribe({
      next: res => {
        console.log('Bid placed successfully', res);
        alert("Bid placed successfully")
      },
      error: (err) => {
        console.log(err); // full error object

        alert(err.error.message);
      }
    });
  }

  getLotFromAuctionId(auctionId: number, lotNumber: number): Observable<Lot> {
    return this.http.get<Lot>(
      this.getLotFromAuctionIdUrl + `${auctionId}/${lotNumber}`
    );
  }

  getAuction(auctionId: string): Observable<Auction> {
    return this.http.get<Auction>(
      this.getAuctionUrl + auctionId
    );
  }

}
