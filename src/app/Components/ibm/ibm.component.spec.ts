import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IBMComponent } from './ibm.component';

describe('IBMComponent', () => {
  let component: IBMComponent;
  let fixture: ComponentFixture<IBMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IBMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IBMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
