export class Employee {
  id: string;
  name: string;
  email: string;
  mobile: string;
  salary:number;
  rating: number;
  created_at: string;
  updated_at: string;
  role: string;
  parent_id: string;
  reportees: Employee[];
  reporter: Employee;
}

export class EmployeeList {
  employees: Employee[]
  pagination: any;
}