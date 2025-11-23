import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingUpCustomerPage } from './sing-up-customer.page';

describe('SingUpCustomerPage', () => {
  let component: SingUpCustomerPage;
  let fixture: ComponentFixture<SingUpCustomerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SingUpCustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
