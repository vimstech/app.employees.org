import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Employee } from '../employee';

@Component({
  selector: 'org-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss']
})
export class EmployeeSearchComponent implements OnInit {
  private employees$: Observable<Employee[]>;
  private searchTerms = new Subject<string>();

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
}
