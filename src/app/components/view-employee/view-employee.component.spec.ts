import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeeComponent } from './view-employee.component';
import { of, Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material-module';
import { Dependent } from 'src/app/models/Dependent';
import { isRegExp } from 'util';

describe('ViewEmployeeComponent', () => {
  let component: ViewEmployeeComponent;
  let fixture: ComponentFixture<ViewEmployeeComponent>;
  let testEmployee: Employee;


  let strs: string[];

  let mockParamMap = of( {
    has: (str) => true,
    get: (str) => '1',
    getAll: () => new Array<string>(),
    keys: new Array<string>()
  });

  let routeMock : Partial<ActivatedRoute> = {
    paramMap: mockParamMap
  };

  let employeeServiceMock = {
    getEmployeeById: function(id){
      return of(testEmployee);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmployeeComponent ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceMock},
        {provide: ActivatedRoute, useValue: routeMock}
      ],
      imports: [MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testEmployee = new Employee();
    testEmployee.EmployeeId = 1;
    testEmployee.AnnualCost = 100;
    testEmployee.Discount = 5;
    testEmployee.FirstName = "Ben";
    testEmployee.LastName = "Heil";

    let testDependent = new Dependent();
    testDependent.AnnualCost = 50;
    testDependent.Discount = 10;
    testEmployee.Dependents.push(testDependent);

    fixture = TestBed.createComponent(ViewEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the employee from the route', () => {
    expect(component.employee.EmployeeId === testEmployee.EmployeeId).toBeTruthy();
  });

  it('should calculate the total cost correctly', () => {
    expect(component.totalCost === 150).toBeTruthy();
  });

  it('should calculate the total discount correctly', () => {
    expect(component.totalDiscount === 15).toBeTruthy();
  });
});
