import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { Employee } from './employee';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = 'http://localhost:3000/employees';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  getTopEmployees (): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/top`, {}).pipe(
      tap(_ => this.log('fetched employees')),
      catchError(this.handleError('getEmployees', []))
    );
  }

  getEmployees (params: any = {}): Observable<Employee[]> {
    params['page'] = params['page'] || 1
    params['per'] = params['per'] || 10
    return this.http.get<Employee[]>(this.baseUrl, { params: params }).pipe(
      tap(_ => this.log('fetched employees')),
      catchError(this.handleError('getEmployees', []))
    );
  }

  searchEmployees (term: string): Observable<Employee[]> {
    term = term.trim();
    const params = {}
    if (!term) {
      return of([]);
    }
    params['page'] = 1;
    params['per'] = 10;
    let search = `search[name]=${term}`;
    return this.http.get<Employee[]>(`${this.baseUrl}?${search}`, { params: params }).pipe(
      tap(_ => this.log('search employees')),
      catchError(this.handleError('searchEmployees', []))
    );
  }

  addEmployee (employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee).pipe(
      tap((h: Employee) => this.log(`Create employee id=${h.id}`)),
      catchError(this.handleError<Employee>(`addEmployee`))
    );
  }

  getEmployee (id: string): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + `/${id}`).pipe(
      tap(_ => this.log(`Fetched employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.baseUrl + `/${employee.id}`, employee).pipe(
      tap(_ => this.log(`Update employee id=${employee.id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  deleteEmployee(employeeId: string): Observable<any> {
    return this.http.delete(this.baseUrl + `/${employeeId}`).pipe(
      tap(_ => this.log(`Delete employee id=${employeeId}`)),
      catchError(this.handleError<any>('deleteEmployee'))
    );
  }

  log(message: string) {
    this.messageService.add(message);
  }

  handleError<T> (operation= 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
