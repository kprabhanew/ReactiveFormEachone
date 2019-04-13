import { Component, OnInit } from '@angular/core';
import {Address, Customer} from '../models/customer';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  personalForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.personalForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      address: ['', [Validators.required]],
     other: this.formBuilder.array([ this.addSkillFormGroup()])
    });
    this.personalForm.get('firstName').valueChanges.subscribe(
      value => {
        console.log(value);
      }
    );
    this.personalForm.get('other').valueChanges.subscribe(
      value => {
        console.log(value);
      }
    );
    this.personalForm.valueChanges.subscribe(
      value => {
        console.log(JSON.stringify(value));
      }
    );
  }
  onSubmit(): void {
    console.log(this.personalForm.value);
  }

  onLoadDataClick(): void {
    this.personalForm.setValue({
      firstName: 'Rajendra',
      lastName: 'Taradale',
      address: 'Dhanori Pune',
      other: [this.SetSkillFormGroup()]
    });
  }
  onsetValueClick(): void {
    this.personalForm.setValue({
      firstName: '',
      lastName: '',
      address: '',
      other: {
        education: 'B Tech',
        age: 30,
        degree: 'Bachelor'
      }
    });
  }

  addSkillButtonClick(): void {
    (<FormArray>this.personalForm.get('other')).push(this.addSkillFormGroup());
  }

  onpatchValueClick(): void {
    this.personalForm.patchValue({
      firstName: 'Rajendra',
      lastName: 'Taradale',
      address: '',
     });
  }

  SetSkillFormGroup(): void {
    (<FormArray>this.personalForm.get('other')).push(
   this.formBuilder.group({
      education: 'B C A ',
      age : '30',
      degree: 'Bachelor'
    })
    );
  }

  addSkillFormGroup(): FormGroup {
    return this.formBuilder.group({
      education: ['', Validators.required],
      age : ['', Validators.required],
      degree: ['Bachelor', Validators.required]
    });
  }
  removeSkillFormGroup(): FormGroup {
    return this.formBuilder.group({
      education: ['', Validators.required],
      age : ['', Validators.required],
      degree: ['Bachelor', Validators.required]
    });
  }

  onClearDataClick() {
    this.personalForm.reset();
  }
}
