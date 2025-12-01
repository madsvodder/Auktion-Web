export interface BidDto {
  // From bid interface
  id?: number;
  lotId: number;
  userId: number;
  amount: number;
  placedAt: Date;

  // From user interface
  username: string;
}
