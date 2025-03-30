import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbiesWindowComponent } from './hobbies-window.component';

describe('HobbiesWindowComponent', () => {
  let component: HobbiesWindowComponent;
  let fixture: ComponentFixture<HobbiesWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HobbiesWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HobbiesWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
