import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public $Employees: BehaviorSubject<Employee[]>;

  constructor(private http: HttpClient) { }

  public getEmployeeById(id: number) : Observable<Employee>{
    return this.http.get<Employee>(environment.baseApi + `employee?employeeId=${id}`);
  }

  public addEmployee(employee: Employee) : Observable<Employee>{
    return this.http.post<Employee>(environment.baseApi + '/employee', employee);
  }

  public refreshEmployees() {
    this.http.get<Employee[]>(environment.baseApi + '/employee').subscribe(employees => {
      this.$Employees.next(employees);
    });
  }
}