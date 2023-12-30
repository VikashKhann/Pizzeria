import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildpizzaComponent } from './buildpizza.component';

describe('BuildpizzaComponent', () => {
  let component: BuildpizzaComponent;
  let fixture: ComponentFixture<BuildpizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildpizzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildpizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
