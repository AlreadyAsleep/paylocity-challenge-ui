import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';


const routes: Routes = [
  {path: "", redirectTo: "dashboard", pathMatch: "full"},
  {path: "dashboard", component: DashboardComponent},
  {path: "employee/new", component: AddEmployeeComponent},
  {path: "employee/:employeeId", component: ViewEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
