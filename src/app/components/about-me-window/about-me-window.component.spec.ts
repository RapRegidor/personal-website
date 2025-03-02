import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeWindowComponent } from './about-me-window.component';

describe('AboutMeWindowComponent', () => {
  let component: AboutMeWindowComponent;
  let fixture: ComponentFixture<AboutMeWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMeWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutMeWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
