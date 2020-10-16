import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerItemComponent } from './messenger-item.component';

describe('MessengerItemComponent', () => {
  let component: MessengerItemComponent;
  let fixture: ComponentFixture<MessengerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessengerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
