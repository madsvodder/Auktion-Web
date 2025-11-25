import {Component, inject, Input, OnInit} from '@angular/core';
import {Auction} from '../../interfaces/auction';
import {ApiService} from '../../services/api-service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-auction-view',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './auction-view.html',
  styleUrl: './auction-view.css',
})
export class AuctionView implements OnInit {

  private route = inject(ActivatedRoute);
  public apiService = inject(ApiService);
  auction!: Auction

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');


    // Example – adjust to your ApiService
    this.apiService.getAuction(id!).subscribe(auction => {
      this.auction = auction;
      console.log(this.auction)
      this.apiService.loadLotsFromAuction(this.auction.id)
    });

    }
}
