import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingUpProfessionalPage } from './sing-up-professional.page';

describe('SingUpProfessionalPage', () => {
  let component: SingUpProfessionalPage;
  let fixture: ComponentFixture<SingUpProfessionalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SingUpProfessionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
