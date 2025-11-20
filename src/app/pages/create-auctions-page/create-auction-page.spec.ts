import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuctionPage } from './create-auction-page';

describe('CreateAuctionPage', () => {
  let component: CreateAuctionPage;
  let fixture: ComponentFixture<CreateAuctionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAuctionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAuctionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
