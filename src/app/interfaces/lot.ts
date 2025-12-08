import {Auction} from './auction';
import {LotImage} from './lot-image';

export interface Lot {
  id: number,
  lotNumber: number,
  title: string,
  description: string,
  startingPrice: number,
  endingPrice?: number,
  estimatedPrice: number,
  auctionId: number,
  winnerUserId?: number;
  images?: LotImage[];
}
