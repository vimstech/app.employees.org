import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { Employee} from '../models/employee';

@Component({
  selector: 'org-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  private employee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee (): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.employeeService.getEmployee(id).subscribe(employee => {
      this.employee = employee;
      console.log(employee)
      if(this.employee.role !== 'sde'){
        this.employeeService.getReportees(employee.id).subscribe(reportees => {
          this.employee.reportees = reportees;
        })
      }
    });
  }

  onEmployeeSelected (employee: Employee) {
    employee.parent_id = this.employee.id;
    this.employeeService.updateEmployee(employee).subscribe(_ => this.getEmployee())
  }
  save () {
    this.employeeService.updateEmployee(this.employee)
      .subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }
}
