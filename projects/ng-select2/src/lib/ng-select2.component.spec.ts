import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSelect2Component } from './ng-select2.component';

describe('NgSelect2Component', () => {
  let component: NgSelect2Component;
  let fixture: ComponentFixture<NgSelect2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgSelect2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
