import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLotPage } from './create-lot-page';

describe('CreateLotPage', () => {
  let component: CreateLotPage;
  let fixture: ComponentFixture<CreateLotPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLotPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
