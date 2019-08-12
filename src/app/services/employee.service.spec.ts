import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee';

describe('EmployeeService', () => {
  // beforeEach(() => TestBed.configureTestingModule({}));

  let injector: TestBed;
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ EmployeeService ]
    });
    injector = getTestBed();
    service = injector.get(EmployeeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
