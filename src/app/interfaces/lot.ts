import {Auction} from './auction';

export interface Lot {
  Id: number,
  LotNumber: number,
  Title: string,
  Description: string,
  StartingPrice: number,
  EndingPrice: number,
  EstimatedPrice: number,
  AuctionId: number,
  Auction: Auction,
}
