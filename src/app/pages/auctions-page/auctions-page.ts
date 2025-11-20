import {Component, OnInit} from '@angular/core';
import {AuctionCard} from '../../components/auction-card/auction-card';
import {Sidebar} from '../../components/sidebar/sidebar';
import {ApiService} from '../../services/api-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-auctions-page',
  imports: [
    AuctionCard,
    Sidebar,
    RouterLink
  ],
  templateUrl: './auctions-page.html',
  styleUrl: './auctions-page.css',
})
export class AuctionsPage implements OnInit {

  constructor(public apiService: ApiService) {
  }

  // When we load this page, we also load all the aucitons
  // from the api to the apiservice
  ngOnInit() {
    this.apiService.loadAuctions()
  }

}
