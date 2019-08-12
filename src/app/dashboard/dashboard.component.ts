import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'org-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getTopEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }
  onEmployeeSelected($event) {
    this.router.navigate(['employees', $event.id])
  }
}
