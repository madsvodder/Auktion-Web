import {Component, inject, Input, OnInit} from '@angular/core';
import {Auction} from '../../interfaces/auction';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auction-card',
  imports: [
    DatePipe
  ],
  templateUrl: './auction-card.html',
  styleUrl: './auction-card.css',
})
export class AuctionCard implements OnInit {

  private router = inject(Router);

  @Input() auction!: Auction;

  ngOnInit() {
    console.log(this.auction);
  }

  protected readonly DatePipe = DatePipe;
}
