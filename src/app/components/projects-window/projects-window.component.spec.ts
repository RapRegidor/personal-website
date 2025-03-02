import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsWindowComponent } from './projects-window.component';

describe('ProjectsWindowComponent', () => {
  let component: ProjectsWindowComponent;
  let fixture: ComponentFixture<ProjectsWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
