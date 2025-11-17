import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionsPage } from './auctions-page';

describe('AuctionsPage', () => {
  let component: AuctionsPage;
  let fixture: ComponentFixture<AuctionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
