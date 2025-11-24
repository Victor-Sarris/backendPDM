import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessionalDashBoardPage } from './professional-dash-board.page';

describe('ProfessionalDashBoardPage', () => {
  let component: ProfessionalDashBoardPage;
  let fixture: ComponentFixture<ProfessionalDashBoardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalDashBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
