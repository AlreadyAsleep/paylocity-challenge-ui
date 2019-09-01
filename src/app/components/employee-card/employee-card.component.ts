import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { Dependent } from 'src/app/models/Dependent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {

  @Input() employee: Employee;
  totalCost: number;
  totalDiscount: number;

  constructor(private router: Router) { }

  ngOnInit() {
    this.totalCost = this.employee.AnnualCost + (this.employee.Dependents.length > 0 ?  this.employee.Dependents.map(x => x.AnnualCost).reduce((a, b) =>  a + b): 0);
    this.totalDiscount = this.employee.Discount + (this.employee.Dependents.length > 0 ? this.employee.Dependents.map(x => x.Discount).reduce((a, b) => a + b): 0);
  }

  onEmployeeClick(id: number){
    this.router.navigateByUrl(`employee/${id}`);
  }
}
