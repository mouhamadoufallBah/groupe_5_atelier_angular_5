import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTrashComponent } from './contact-trash.component';

describe('ContactTrashComponent', () => {
  let component: ContactTrashComponent;
  let fixture: ComponentFixture<ContactTrashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactTrashComponent]
    });
    fixture = TestBed.createComponent(ContactTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
