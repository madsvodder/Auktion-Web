import {Injectable, signal} from '@angular/core';
import {Auction} from '../interfaces/auction';
import {HttpClient} from '@angular/common/http';
import {Lot} from '../interfaces/lot';
import {Bid} from '../interfaces/bid';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private getAuctionsUrl = "http://localhost:5264/api/Auction"
  private getLotsUrl = "http://localhost:5264/api/Lot"
  private getLotsFromAuctionUrl = "http://localhost:5264/api/Lot/auction/"
  private getBidsFromLotUrl = "http://localhost:5264/api/Bid/lot/"

  private placeBidUrl = "http://localhost:5264/api/Bid"

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

  bidOnLot(bidInput: Bid){
    this.http.post(this.placeBidUrl, bidInput).subscribe(res => {
      console.log(res);
    })
  }

  getLot(lotNumber: number) {
    return this.http.get<Lot>(`${this.getLotsUrl}/${lotNumber}`);
  }
}
