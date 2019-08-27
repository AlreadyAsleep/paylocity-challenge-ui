import { Dependent } from './Dependent';
import { Person } from './person';

export class Employee extends Person{
    Dependents: Array<Dependent>;
}