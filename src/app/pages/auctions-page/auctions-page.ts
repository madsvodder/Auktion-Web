import { Component } from '@angular/core';
import {AuctionBlock} from '../../components/auction-block/auction-block';

@Component({
  selector: 'app-auctions-page',
  imports: [
    AuctionBlock
  ],
  templateUrl: './auctions-page.html',
  styleUrl: './auctions-page.css',
})
export class AuctionsPage {

}
