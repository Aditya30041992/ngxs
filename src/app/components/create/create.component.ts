import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';

import { AddUser, SetSelectedUser, UpdateUser } from '../../actions/user.actions';
import { Reset, UserState } from 'src/app/state/user.state';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Select(UserState.getSelectedUser) selectedUser: Observable<User>;

  angForm: FormGroup;
  editUser = false;

  constructor(private fb: FormBuilder, private store: Store, private http: HttpClientModule) {

  }

  // this function use for create form using FormBuilder as well as we validates fields using required 

  createForm(): void {
    this.angForm = this.fb.group({
      employeeId: [''],
      name: ['', Validators.required],
      ManagerId: ['', Validators.required]
    });

    if (this.editUser) {
      this.store.dispatch(new UpdateUser(this.angForm.value, this.angForm.value.employeeId)).subscribe(() => {
        this.clearForm();
      });
    } else {
      this.store.dispatch(new AddUser(this.angForm.value)).subscribe(() => {
        this.clearForm();
      });
    }
  }

  clearForm() {
    this.angForm.reset();
    this.store.dispatch(new SetSelectedUser(null));
    this.store.dispatch(new Reset()).subscribe(() => this.angForm.reset());
  }
  // this function is used to reset the state

  // reset() {
    
  // }

  // this function is used to add new user information

  addUser(name, ManagerId) {
    this.store.dispatch(new AddUser({ name, ManagerId }));
  }

  ngOnInit() {
    this.createForm();
    this.selectedUser.subscribe(user => {
      if (user) {
        this.angForm.patchValue({
          employeeId: user.employeeId,
          name: user.name,
          ManagerId: user.ManagerId
        });
        this.editUser = true;
      }
      else {
        this.editUser = false;
      }
    });
  }

}
