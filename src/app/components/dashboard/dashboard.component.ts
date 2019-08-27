import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService: EmployeeService, router: Router) { }

  ngOnInit() {
    this.employeeService.$Employees.subscribe(employees => {
      this.employees = employees;
    });
  }
}
