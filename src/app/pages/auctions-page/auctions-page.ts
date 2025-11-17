import { Component } from '@angular/core';
import {AuctionCard} from '../../components/auction-card/auction-card';

@Component({
  selector: 'app-auctions-page',
  imports: [
    AuctionCard
  ],
  templateUrl: './auctions-page.html',
  styleUrl: './auctions-page.css',
})
export class AuctionsPage {

}
