import {Injectable, signal} from '@angular/core';
import {Auction} from '../interfaces/auction';
import {HttpClient} from '@angular/common/http';
import {Lot} from '../interfaces/lot';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private getAuctionsUrl = "http://localhost:5264/api/Auction"
  private getLotsUrl = "http://localhost:5264/api/Lot"
  private getLotsFromAuctionUrl = "http://localhost:5264/api/Lot/auction/"

  auctions = signal<Auction[]>([]);
  lots = signal<Lot[]>([]);

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
}
