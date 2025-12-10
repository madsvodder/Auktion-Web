import {Component, inject, Input, OnInit} from '@angular/core';
import {Auction} from '../../interfaces/auction';
import {ApiService} from '../../services/api-service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {LoginService} from '../../services/login-service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-auction-view',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './auction-view.html',
  styleUrl: './auction-view.css',
})
export class AuctionView implements OnInit {

  private route = inject(ActivatedRoute);
  public apiService = inject(ApiService);
  public loginService = inject(LoginService);
  auction!: Auction

  public maxi: string = "https://images.ctfassets.net/yb682zl7v5ka/2957544974423012041/35ee7f891e411630a2885e738657181d/maxi1.png?w=1200&h=1047&fm=webp"

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
