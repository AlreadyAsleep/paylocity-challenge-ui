import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { environment } from 'src/environments/environment';
import { catchError } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private $Employees: BehaviorSubject<Array<Employee>>;

  constructor(private http: HttpClient) {
    this.$Employees = new BehaviorSubject<Employee[]>(new Array<Employee>());
   }

  public async getEmployees(){
    await this.refreshEmployees();
    return this.$Employees;
  }

  public getEmployeeById(id: number) : Observable<Employee>{
    return this.http.get<Employee>(environment.baseApi + `employee?employeeId=${id}`).pipe(catchError(this.handleError));
  }

  public addEmployee(employee: Employee) : Observable<Employee>{
    return this.http.post<Employee>(environment.baseApi + '/employee', employee).pipe(catchError(this.handleError));
  }

  private refreshEmployees() {
    this.http.get<Array<Employee>>(environment.baseApi + '/employee').pipe(catchError(this.handleError)).subscribe(employees => {
      this.$Employees.next(employees);
    });
  }

  private handleError(err: HttpErrorResponse){
    return Observable.throw(err.message || 'Server Error');
  }
}