import { Routes } from '@angular/router';
import {AuctionsPage} from './pages/auctions-page/auctions-page';
import {CreateAuctionPage} from './pages/create-auctions-page/create-auction-page';
import {AuctionView} from './pages/lots-page/auction-view';

export const routes: Routes = [
  {path: '', component: AuctionsPage, title: 'Auctions'},
  {path: 'create-auction', component: CreateAuctionPage, title: 'Create Auction'},
  {path: 'auctions/:id', component: AuctionView},
];
