import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionBlock } from './auction-block';

describe('AuctionBlock', () => {
  let component: AuctionBlock;
  let fixture: ComponentFixture<AuctionBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
