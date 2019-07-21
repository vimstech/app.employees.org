import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeSearchComponent } from '../employee-search/employee-search.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageComponent } from '../message/message.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule],
      providers: [ HttpClient, HttpClientTestingModule ],
      declarations: [ DashboardComponent, EmployeeSearchComponent, MessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
