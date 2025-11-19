import {Component, Input, OnInit} from '@angular/core';
import {Auction} from '../../interfaces/auction';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-auction-card',
  imports: [
    DatePipe
  ],
  templateUrl: './auction-card.html',
  styleUrl: './auction-card.css',
})
export class AuctionCard implements OnInit {
  @Input() auction!: Auction;

  ngOnInit() {
    console.log(this.auction);
  }

  protected readonly DatePipe = DatePipe;
}
