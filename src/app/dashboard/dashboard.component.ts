import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'org-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getTopEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }
}
