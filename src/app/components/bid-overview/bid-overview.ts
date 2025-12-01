import {Component, inject, Input, input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api-service';
import {Lot} from '../../interfaces/lot';
import {Bid} from '../../interfaces/bid';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-bid-overview',
  imports: [
    DatePipe
  ],
  templateUrl: './bid-overview.html',
  styleUrl: './bid-overview.css',
})
export class BidOverview implements OnInit {
  public apiService = inject(ApiService);

  @Input() lot!: Lot;

  ngOnInit() {
    console.log(this.lot);
    this.apiService.loadBidsFromLot(<number>this.lot?.id)
  }

  protected readonly DatePipe = DatePipe;
}
