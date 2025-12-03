import {Auction} from './auction';

export interface Lot {
  id: number,
  lotNumber: number,
  title: string,
  description: string,
  startingPrice: number,
  endingPrice?: number,
  estimatedPrice: number,
  auctionId: number,
}
