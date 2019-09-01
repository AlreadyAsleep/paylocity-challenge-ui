import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  employees: BehaviorSubject<Array<Employee>>;

  constructor(private employeeService: EmployeeService) { }

  async ngOnInit() {
    this.employees = await this.employeeService.getEmployees();
  }


}
