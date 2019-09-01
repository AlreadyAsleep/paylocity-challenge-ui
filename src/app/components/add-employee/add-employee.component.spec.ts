import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeComponent } from './add-employee.component';
import { Employee } from 'src/app/models/employee';
import { Subject, of } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Dependent } from 'src/app/models/Dependent';
import { MaterialModule } from 'src/app/modules/material-module';
import { EmployeeService } from 'src/app/services/employee.service';
import {  ReactiveFormsModule } from '@angular/forms';

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;
  let testEmployee: Employee;

  let router: RouterStub;
  let employeeService: EmployeeServiceStub;

  class RouterStub {
    public url;
    private subject = new Subject();
    public events = this.subject.asObservable();
  
    navigateByUrl(url: string) {
      this.url = url;
      this.triggerNavEvents(url);
    }
  
    triggerNavEvents(url) {
      let ne = new NavigationEnd(0, url, null);
      this.subject.next(ne);
    }
  }

  class EmployeeServiceStub {
    employee: Employee;
    addEmployee(emp) {
      this.employee = emp;
      return of(this.employee)
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeeComponent ],
      imports: [MaterialModule, ReactiveFormsModule],
      providers: [
        {provide: Router, useClass: RouterStub},
        {provide: EmployeeService, useClass: EmployeeServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testEmployee = new Employee();
    testEmployee.EmployeeId = 1;
    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    component.employee = testEmployee;
    router = TestBed.get(Router);
    employeeService = TestBed.get(EmployeeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to correctly add a dependent', () => {
    let dependentEntry = {
      firstName: 'Ben', lastName: 'Heil'
    };
    component.addDependent(dependentEntry);
    expect(component.employee.Dependents
      .filter(x => x.FirstName === dependentEntry.firstName && x.LastName === dependentEntry.lastName).length > 0)
      .toBeTruthy();
  });

  it('should be able to remove a dependent once added', () => {
    let dependentEntry = {
      firstName: 'Ben', lastName: 'Heil'
    };
    component.addDependent(dependentEntry);
    component.removeDependent(component.employee.Dependents.filter(x => x.FirstName === dependentEntry.firstName && x.LastName === dependentEntry.lastName)[0]);
    expect(component.employee.Dependents.length === 0).toBeTruthy();
  });

  it('should submit the correct information', () => {
    let employeeEntry = {
      firstName: 'Ben', lastName: 'Heil'
    };
    component.submit(employeeEntry);
    expect(employeeService.employee.FirstName === employeeEntry.firstName && employeeService.employee.LastName == employeeEntry.lastName)
    .toBeTruthy();
  });

  it('should navigate to the correct url on submission', () => {
    let employeeEntry = {
      firstName: 'Ben', lastName: 'Heil'
    };
    component.submit(employeeEntry);
    expect(router.url === `employee/${testEmployee.EmployeeId}`).toBeTruthy();
  });
});
