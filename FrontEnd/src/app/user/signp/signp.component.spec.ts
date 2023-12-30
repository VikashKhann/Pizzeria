import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignpComponent } from './signp.component';

describe('SignpComponent', () => {
  let component: SignpComponent;
  let fixture: ComponentFixture<SignpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
