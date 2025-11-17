import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuctionsPage} from './pages/auctions-page/auctions-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuctionsPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('untitled');
}
