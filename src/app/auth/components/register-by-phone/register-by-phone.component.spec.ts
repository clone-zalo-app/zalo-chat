import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterByPhoneComponent } from './register-by-phone.component';

describe('RegisterByPhoneComponent', () => {
  let component: RegisterByPhoneComponent;
  let fixture: ComponentFixture<RegisterByPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterByPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterByPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
