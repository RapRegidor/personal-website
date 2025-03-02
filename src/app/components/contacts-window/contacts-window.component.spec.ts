import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsWindowComponent } from './contacts-window.component';

describe('ContactsWindowComponent', () => {
  let component: ContactsWindowComponent;
  let fixture: ComponentFixture<ContactsWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
