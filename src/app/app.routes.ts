import { Routes } from '@angular/router';
import {AuctionsPage} from './pages/auctions-page/auctions-page';
import {CreateAuctionPage} from './pages/create-auctions-page/create-auction-page';
import {AuctionView} from './pages/auction-view/auction-view';
import {LotView} from './pages/lot-view/lot-view';
import {LoginPage} from './pages/login-page/login-page';
import {RegisterPage} from './pages/register-page/register-page';


export const routes: Routes = [
  {path: '', component: AuctionsPage, title: 'Auctions'},
  {path: 'create-auction', component: CreateAuctionPage, title: 'Create Auction'},
  {path: 'login', component: LoginPage, title: 'Login'},
  {path: 'register', component: RegisterPage, title: 'Register'},
  {path: 'auctions/:id', component: AuctionView},
  {path: 'auctions/:id/lot/:lotnumber', component: LotView},
];
