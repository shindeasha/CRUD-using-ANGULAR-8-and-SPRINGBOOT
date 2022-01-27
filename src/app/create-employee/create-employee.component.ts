import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  exform: FormGroup;
  employee: Employee=new Employee();
  submitted = false;
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(){
    this.exform = new FormGroup({
        'fname' : new FormControl(null,Validators.required),
        'lname' : new FormControl(null,Validators.required),
        'email' : new FormControl(null,[Validators.required, Validators.email])
    });
  }


  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }
  saveEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe(data=>{
      console.log(data);
      this.goToEmployeeList();
    },
    error=>console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);  
  }
  onSubmit(){
    this.submitted = true;
    this.saveEmployee();
    
    
  }
  

}
