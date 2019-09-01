import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCardComponent } from './employee-card.component';
import { Subject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material-module';
import { Employee } from 'src/app/models/employee';
import { Dependent } from 'src/app/models/Dependent';

describe('EmployeeCardComponent', () => {
  let component: EmployeeCardComponent;
  let fixture: ComponentFixture<EmployeeCardComponent>;
  let testEmployee: Employee;

  let router: RouterStub;

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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCardComponent ],
      imports:[
        MaterialModule,
      ],
      providers: [
        {provide: Router, useClass: RouterStub}
      ]
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

    fixture = TestBed.createComponent(EmployeeCardComponent);
    component = fixture.componentInstance;
    component.employee = testEmployee;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the total cost correctly', () => {
    expect(component.totalCost === 150).toBeTruthy();
  });

  it('should calculate the total discount correctly', () => {
    expect(component.totalDiscount === 15).toBeTruthy();
  });

  it('should try to navigate to the correct employee page', () => {
    component.onEmployeeClick(testEmployee.EmployeeId);
    expect(router.url === 'employee/1').toBeTruthy();
  })
});
