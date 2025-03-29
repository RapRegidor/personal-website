import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeWindowComponent } from './resume-window.component';

describe('ResumeWindowComponent', () => {
  let component: ResumeWindowComponent;
  let fixture: ComponentFixture<ResumeWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
