import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/modules/material-module';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { of } from 'rxjs';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;


  class EmployeeServiceStub {
    employee: Employee;
    addEmployee(emp) {
      this.employee = emp;
      return of(this.employee)
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, EmployeeCardComponent ],
      imports: [MaterialModule],
      providers: [{provide: EmployeeService, useClass: EmployeeServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
