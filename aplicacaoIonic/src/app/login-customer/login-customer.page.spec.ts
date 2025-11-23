import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginCustomerPage } from './login-customer.page';

describe('LoginCustomerPage', () => {
  let component: LoginCustomerPage;
  let fixture: ComponentFixture<LoginCustomerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
