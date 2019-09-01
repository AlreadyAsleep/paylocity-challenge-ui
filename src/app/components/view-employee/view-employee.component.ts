import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent {

  employee: Employee;
  notFound: boolean = false;
  totalCost: number;
  totalDiscount: number;
  numberOfPaychecks: number = 26;
  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {
    this.route.paramMap.subscribe(params => {
        this.employeeService.getEmployeeById(+params.get('employeeId')).subscribe(e => {
          this.employee = e;
          this.totalCost = this.employee.AnnualCost + (this.employee.Dependents.length > 0 ?  this.employee.Dependents.map(x => x.AnnualCost).reduce((a, b) =>  a + b): 0);
          this.totalDiscount = this.employee.Discount + (this.employee.Dependents.length > 0 ? this.employee.Dependents.map(x => x.Discount).reduce((a, b) => a + b): 0);
        },
        err => {
          this.notFound = true;
        });

    });  
  }
}
