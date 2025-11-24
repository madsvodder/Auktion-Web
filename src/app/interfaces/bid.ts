import {Lot} from './lot';

export interface Bid {
  id?: number;
  lotId: number;
  userId: string;
  amount: number;
  placedAt: Date;
  //lot: Lot;
}
