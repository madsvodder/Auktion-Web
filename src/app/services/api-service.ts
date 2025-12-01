import {inject, Injectable, signal} from '@angular/core';
import {Auction} from '../interfaces/auction';
import {HttpClient} from '@angular/common/http';
import {Lot} from '../interfaces/lot';
import {Bid} from '../interfaces/bid';
import {Observable} from 'rxjs';
import {LoginService} from './login-service';
import {BidDto} from '../dto/bid-dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  public loginService = inject(LoginService);

  // API Urls
  private getAuctionsUrl = "http://localhost:5264/api/Auction"
  private getLotsUrl = "http://localhost:5264/api/Lot"
  private getLotsFromAuctionUrl = "http://localhost:5264/api/Lot/auction/"
  private getBidsFromLotUrl = "http://localhost:5264/api/Bid/lot/"
  private placeBidUrl = "http://localhost:5264/api/Bid"
  private getLotFromAuctionIdUrl = "http://localhost:5264/api/Lot/"
  private getAuctionUrl = "http://localhost:5264/api/Auction/"
  private getHighestBidUrl = "http://localhost:5264/api/Bid/lot/"

  // Lists
  auctions = signal<Auction[]>([]);
  lots = signal<Lot[]>([]);
  bidsInCurrentLot = signal<BidDto[]>([]);

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
    this.http.get<BidDto[]>(this.getBidsFromLotUrl + lotId).subscribe(res => {
      this.bidsInCurrentLot.set(res);
    });
  }

  bidOnLot(bidInput: Bid) {

    let headers = this.loginService.getLoginHeader()

    return this.http.post(this.placeBidUrl, bidInput, {headers})
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

  getHighestBid(lotId: number) {
    return this.http.get<Bid>(
      this.getHighestBidUrl + lotId + "/highest"
    )
  }
}
