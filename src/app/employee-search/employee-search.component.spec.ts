import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSearchComponent } from './employee-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmployeeSearchComponent', () => {
  let component: EmployeeSearchComponent;
  let fixture: ComponentFixture<EmployeeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ EmployeeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
