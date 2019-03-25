import { User } from '../models/User';

export class AddUser {
    static readonly type = '[User] AddItemToIndexpage';

    constructor(public payload: User) { }
}

export class GetUser {
    static readonly type = '[User] Get';
}

export class UpdateUser {
    static readonly type = '[User] Update';

    constructor(public payload : User, public employeeId: number) {

    }
}

export class DeleteUser {
    static readonly type = '[User] Delete';

    constructor (public employeeId: number ) {

    }
}

export class SetSelectedUser {
    static readonly type = '[User] Set';
    
    constructor(public payload: User) {
    }
}