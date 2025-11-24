import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotView } from './lot-view';

describe('LotView', () => {
  let component: LotView;
  let fixture: ComponentFixture<LotView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
