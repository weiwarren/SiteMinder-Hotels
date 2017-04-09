/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HotelMapViewComponent } from './hotel-map-view.component';

describe('HotelMapViewComponent', () => {
  let component: HotelMapViewComponent;
  let fixture: ComponentFixture<HotelMapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelMapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
