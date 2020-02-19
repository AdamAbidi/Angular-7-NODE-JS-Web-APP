import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputExpectedComponent } from './output-expected.component';

describe('OutputExpectedComponent', () => {
  let component: OutputExpectedComponent;
  let fixture: ComponentFixture<OutputExpectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputExpectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputExpectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
