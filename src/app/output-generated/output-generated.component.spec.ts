import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputGeneratedComponent } from './output-generated.component';

describe('OutputGeneratedComponent', () => {
  let component: OutputGeneratedComponent;
  let fixture: ComponentFixture<OutputGeneratedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputGeneratedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
