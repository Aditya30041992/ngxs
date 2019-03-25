import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { Store, Select } from '@ngxs/store';
import { UserState } from 'src/app/state/user.state';
import { GetUser, DeleteUser, UpdateUser, SetSelectedUser } from 'src/app/actions/user.actions';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  //users: Observable<User>;
  @Select(UserState.getUsersList) users: Observable<User[]>;

  // constructor(private store: Store) {
  //   this.users = this.store.select(state => state.users.users);
  // }
  constructor(private store: Store){
    
  }

  ngOnInit() {
    this.store.dispatch(new GetUser());
  }

  deleteUser(employeeId: number) {
    this.store.dispatch(new DeleteUser(employeeId));
  }

  editUser(payload: User) {
    this.store.dispatch(new SetSelectedUser(payload));
  }
}
