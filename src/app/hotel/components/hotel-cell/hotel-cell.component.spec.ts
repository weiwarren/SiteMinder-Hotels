/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HotelCellComponent } from './hotel-cell.component';

describe('HotelCellComponent', () => {
  let component: HotelCellComponent;
  let fixture: ComponentFixture<HotelCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
