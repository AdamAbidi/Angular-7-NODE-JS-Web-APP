import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebServicesListComponent } from './web-services-list.component';

describe('WebServicesListComponent', () => {
  let component: WebServicesListComponent;
  let fixture: ComponentFixture<WebServicesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebServicesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
