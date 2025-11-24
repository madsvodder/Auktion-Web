import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidOverview } from './bid-overview';

describe('BidOverview', () => {
  let component: BidOverview;
  let fixture: ComponentFixture<BidOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BidOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
