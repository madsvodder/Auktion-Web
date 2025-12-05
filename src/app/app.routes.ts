import { Routes } from '@angular/router';
import {AuctionsPage} from './pages/auctions-page/auctions-page';
import {CreateAuctionPage} from './pages/create-auctions-page/create-auction-page';
import {AuctionView} from './pages/auction-view/auction-view';
import {LotView} from './pages/lot-view/lot-view';
import {LoginPage} from './pages/login-page/login-page';
import {CreateLotPage} from './pages/create-lot-page/create-lot-page';
import {RegisterPage} from './pages/register-page/register-page';
import {WonLotsPage} from './pages/won-lots-page/won-lots-page';

export const routes: Routes = [
  {path: '', component: AuctionsPage, title: 'Auctions'},
  {path: 'create-auction', component: CreateAuctionPage, title: 'Create Auction'},
  {path: 'create-lot/:id', component: CreateLotPage, title: 'Create Lot'},
  {path: 'login', component: LoginPage, title: 'Login'},
  {path: 'register', component: RegisterPage, title: 'Register'},
  {path: 'auctions/:id', component: AuctionView},
  {path: 'auctions/:id/lot/:lotnumber', component: LotView},
  { path: 'users/:id/won-lots', component: WonLotsPage }
];
