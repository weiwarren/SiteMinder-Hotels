/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddCustomHotelComponent } from './add-custom-hotel.component';

describe('AddCustomHotelComponent', () => {
  let component: AddCustomHotelComponent;
  let fixture: ComponentFixture<AddCustomHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
