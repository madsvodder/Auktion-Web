import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WonLotsPage } from './won-lots-page';

describe('WonLotsPage', () => {
  let component: WonLotsPage;
  let fixture: ComponentFixture<WonLotsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WonLotsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WonLotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
