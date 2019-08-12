import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Employee } from '../models/employee';

@Component({
  selector: 'org-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss']
})
export class EmployeeSearchComponent implements OnInit {
  private employees$: Observable<Employee[]>;
  private searchTerms = new Subject<string>();

  @Output() employeeSelected = new  EventEmitter<Employee>();

  constructor(private employeeService: EmployeeService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.employees$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.employeeService.searchEmployees(term))
    );
  }
  onSelect(employee: Employee) {
    this.employeeSelected.emit(employee);
    this.searchTerms.next('');
  }
}
