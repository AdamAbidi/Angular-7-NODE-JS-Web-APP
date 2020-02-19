import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWebServiceComponent } from './delete-web-service.component';

describe('DeleteWebServiceComponent', () => {
  let component: DeleteWebServiceComponent;
  let fixture: ComponentFixture<DeleteWebServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteWebServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWebServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
