import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee, EmployeeList } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'org-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employeeList: EmployeeList;
  selectedEmployeeId: string;
  openDialog: boolean;
  @Output() editSelectedEmployee = new EventEmitter<Employee>();
  constructor(private employeeService: EmployeeService) {
    this.employeeList = new EmployeeList()
  }

  ngOnInit() {
    this.getEmployees(1);
  }

  onPageChange($event) {
    this.getEmployees($event);
  }

  getEmployees(page) {
    this.employeeService.getEmployees({'page': page, 'per': 10}).subscribe((response: HttpResponse<any>) => {
      this.employeeList.employees = response.body as Employee[];
      this.employeeList.pagination = JSON.parse(response.headers.get('x-pagination'));
    });
  }

  delete(employee: Employee): void {
    this.employeeService.deleteEmployee(employee.id).subscribe(_ => {
      this.employeeList.employees = this.employeeList.employees.filter((h) => h.id !== employee.id);
    });
  }
  onEmployeeCreated($event) {
    this.employeeList.employees.push($event);
  }

  editEmployee(employee: Employee) {
    this.selectedEmployeeId = employee.id;
    this.editSelectedEmployee.emit(employee);
  }
}
