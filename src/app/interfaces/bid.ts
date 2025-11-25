import {Lot} from './lot';

export interface Bid {
  id?: number;
  lotId: number;
  userId: number;
  amount: number;
  placedAt: Date;
}
