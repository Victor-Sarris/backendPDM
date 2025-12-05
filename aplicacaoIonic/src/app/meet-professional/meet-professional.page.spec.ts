import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeetProfessionalPage } from './meet-professional.page';

describe('MeetProfessionalPage', () => {
  let component: MeetProfessionalPage;
  let fixture: ComponentFixture<MeetProfessionalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetProfessionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
