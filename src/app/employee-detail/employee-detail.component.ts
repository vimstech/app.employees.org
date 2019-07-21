import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { Employee} from '../employee';

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
    });
  }

  save () {
    this.employeeService.updateEmployee(this.employee)
      .subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }
}
