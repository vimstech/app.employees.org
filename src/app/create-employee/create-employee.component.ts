import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'org-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  doOpenDialog: boolean = false;
  @Input() employeeId: string;
  @Input()
  set openDialog(openDialog: boolean){
    console.log(openDialog)
    this.findEmployee(openDialog)
  }
  get openDialog(){
    return this.doOpenDialog;
  }
  @Output() employeeCreated = new EventEmitter<Employee>();

  roles: Array<string> = [];
  employeeForm: FormGroup
  constructor(private employeeService: EmployeeService) {
    this.roles = ['sde', 'manager', 'directory', 'vp', 'ceo']
  }

  ngOnInit() {}

  findEmployee (openDialog: boolean) {
    this.employeeService.findOne(this.employeeId).subscribe((employee: Employee) => {
      this.employeeForm = new FormGroup({
        id: new FormControl(employee.id),
        name: new FormControl(employee.name, Validators.required),
        email: new FormControl(employee.email, Validators.email),
        salary: new FormControl(employee.salary, Validators.required),
        rating: new FormControl(employee.rating, [Validators.min(1),Validators.max(5)]),
        mobile: new FormControl(employee.mobile, Validators.pattern(/^((\+){1}91){1}[1-9]{1}[0-9]{9}$/)),
        role: new FormControl(employee.role, Validators.required)
      });
      this.doOpenDialog = openDialog;
    })
  }
  onSubmit() {
    this.employeeService.save(this.employeeForm.value as Employee).subscribe(employee => {
      this.openDialog = false;
      this.employeeCreated.emit(employee);
    });
  }
}
