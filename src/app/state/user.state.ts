
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from '../models/User';
import { AddUser, GetUser, UpdateUser, DeleteUser, SetSelectedUser } from '../actions/user.actions';
import { AppService } from '../services/app.service';
import { finalize, tap } from 'rxjs/operators';
import { APIService } from '../services/api.service';

export class UserStateModel {
    users: User[];
    selectedUser: User;
}



export class Reset {
    static readonly type = 'Reset';
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: [],
        selectedUser: null
    }
})
export class UserState {
    
    constructor(private apiService: APIService,private appService: AppService) { }


    @Selector()
    static getUsersList(state: UserStateModel) {
        return state.users;
    }

    @Selector()
    static getSelectedUser(state: UserStateModel) {
        return state.selectedUser;
    }

    // This action is used to call the ferchUsers method apiService
    @Action(GetUser)
    getUsers({getState, setState}: StateContext<UserStateModel>) {
        return this.apiService.fetchUsers().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                users: result,
            });
        }));
    }

    @Action(AddUser)
    addUser({getState, patchState}: StateContext<UserStateModel>, {payload}: AddUser) {
        return this.apiService.addUser(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                users: [...state.users, result]
            });
        }));
    }

    @Action(UpdateUser)
    updateUser({getState, setState}: StateContext<UserStateModel>, {payload, employeeId}: UpdateUser) {
        return this.apiService.updateUser(payload, employeeId).pipe(tap((result) => {
            const state = getState();
            const userList = [...state.users];
            const userIndex = userList.findIndex(item => item.employeeId === employeeId);
            userList[userIndex] = result;
            setState({
                ...state,
                users: userList,
            });
        }));
    }

    @Action(DeleteUser)
    deleteUser({getState, setState}: StateContext<UserStateModel>, {employeeId}: DeleteUser) {
        return this.apiService.deleteUser(employeeId).pipe(tap(() => {
            const state = getState();
            const filteredArray = state.users.filter(item => item.employeeId !== employeeId);
            setState({
                ...state,
                users: filteredArray,
            });
        }));
    }

    @Action(SetSelectedUser)
    setSelectedEmployeeId({getState, setState}: StateContext<UserStateModel>, {payload}: SetSelectedUser) {
        const state = getState();
        setState({
            ...state,
            selectedUser: payload
        });
    }



    @Selector()
    static getUsers(state: UserStateModel) {
        return state.users;
    }
    // we have defined the action to save the user data into the store.
    // When the user tries to create the new user, 
    // we get those payload values here and add into the user’s state array
    // when the user is created,
    // the store will update its user state and that state is fetched by another component.
    @Action(AddUser)
    add({ getState, patchState }: StateContext<UserStateModel>, { payload }: AddUser) {
        const state = getState();
        patchState({
            users: [...state.users, payload]
        });
    }

    @Action(Reset)
    reset({ getState, setState }) {
        return this.appService.delay()
            .pipe(
                //tap(() => setState(0)),
                finalize(() => setState(1))
            );
    }


}