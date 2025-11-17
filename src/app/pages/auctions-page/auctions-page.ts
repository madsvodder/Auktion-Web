import { Component } from '@angular/core';
import {AuctionCard} from '../../components/auction-card/auction-card';
import {Sidebar} from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-auctions-page',
  imports: [
    AuctionCard,
    Sidebar
  ],
  templateUrl: './auctions-page.html',
  styleUrl: './auctions-page.css',
})
export class AuctionsPage {

}
