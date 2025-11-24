import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerDashBoardPage } from './customer-dash-board.page';

describe('CustomerDashBoardPage', () => {
  let component: CustomerDashBoardPage;
  let fixture: ComponentFixture<CustomerDashBoardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDashBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
