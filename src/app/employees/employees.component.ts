import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'org-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees({'page': 1, 'per': 10}).subscribe(employees => {
      this.employees = employees;
    });
  }

  delete(employee: Employee): void {
    this.employeeService.deleteEmployee(employee.id).subscribe(_ => {
      this.employees = this.employees.filter((h) => h.id !== employee.id);
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.employeeService.addEmployee({ name } as Employee).subscribe(employee => {
      this.employees.push(employee);
    });
  }
}
