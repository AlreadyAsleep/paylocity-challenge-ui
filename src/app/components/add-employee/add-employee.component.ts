import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Dependent } from 'src/app/models/Dependent';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  });

  dependentForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  });

  employee : Employee;
  errorAdding : boolean = false;

  dependent: Dependent = new Dependent();
  constructor(private employeeService : EmployeeService, private router: Router) { 
    this.employee = new Employee();
    this.employee.Dependents = new Array<Dependent>();
  }

  ngOnInit() {
  }

  addDependent(model){
    let dependent = new Dependent();
    dependent.FirstName = model.firstName;
    dependent.LastName = model.lastName;
    this.employee.Dependents.push(dependent);
  }

  removeDependent(dependent){
    this.employee.Dependents = this.employee.Dependents.filter(x => x !== dependent);
  }

  submit(model){
    this.employee.FirstName = model.firstName
    this.employee.LastName = model.lastName;
    this.employeeService.addEmployee(this.employee).subscribe(e => {
      this.router.navigateByUrl(`employee/${e.EmployeeId}`)
    },
    err => {  
      this.errorAdding = true;
    });
  }

}
