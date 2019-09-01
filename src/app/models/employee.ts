import { Dependent } from './Dependent';
import { Person } from './person';

export class Employee extends Person{
    EmployeeId: number;
    Dependents: Array<Dependent> = new Array<Dependent>();
}