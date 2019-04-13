import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faTimesCircle);

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  userForm: FormGroup;

  constructor() {
    this.userForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'email': new FormControl("", [Validators.required, Validators.email]),
      "gender": new FormControl("", Validators.required),
      "favFood": new FormArray([
        new FormGroup({
          "indian": new FormControl(true, Validators.required)
        }),
        new FormGroup({
          "chinese": new FormControl()
        })
      ]),
      "addresses": new FormArray([
        this.createGroup()
      ])
    });
  } // constructor end

  addAddress() {
    const addressArray = this.userForm.get('addresses') as FormArray;
    addressArray.push(this.createGroup());
  }
  removeAddress(index) {
    // this.userForm.get('addresses').removeAt(index);
    const removeGroup = this.userForm.get('addresses') as FormArray;
    removeGroup.removeAt(index);
  }

  createGroup() {
    return new FormGroup({
      "line1": new FormControl(),
      "line2": new FormControl(),
      "country": new FormControl(),
      "state": new FormControl(),
      "city": new FormControl()
    });
  }
  submitForm() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
  ngOnInit() {
  }

}
