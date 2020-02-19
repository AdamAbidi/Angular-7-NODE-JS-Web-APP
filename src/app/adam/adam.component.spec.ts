import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdamComponent } from './adam.component';

describe('AdamComponent', () => {
  let component: AdamComponent;
  let fixture: ComponentFixture<AdamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
