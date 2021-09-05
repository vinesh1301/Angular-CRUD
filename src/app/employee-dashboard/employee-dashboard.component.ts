import { ApiService } from './../shared/api.service';
import { EmployeeModel } from './emploee-dashboard.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  cities = ["Kolkata", "Bangalore", "Hyderbad"];;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData: any;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', Validators.email],
      mobile: [''],
      location: [''],
    })
    this.getAllEmployee();
  }
  postEmployeeDetails() {

    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.location = this.formValue.value.location;

    this.api.postEmployee(this.employeeModelObj).subscribe(res => {
      console.log(res);
      alert("Employee Added");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
      err => {
        alert("Something went wrong");
      })

  }

  getAllEmployee() {
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
    })
  }

  deleteEmployee(row: any) {
    alert("You really want to delete ?")
    this.api.deleteEmployee(row.id).subscribe(res => {
      alert("Deleted Successfully");
      this.getAllEmployee();

    })
  }

  onEdit(row: any) {
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['location'].setValue(row.location);
    this.showAdd = false;
    this.showUpdate = true;
  }

  updateEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.location = this.formValue.value.location;


    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(res => {
        alert("Updated");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      })
  }
  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

}
