import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class APIService {

    constructor(private http: HttpClient) { }

    fetchUsers() {
        return this.http.get<User[]>('http://localhost:56147/Employees');
    }

    deleteUser(employeeId: number) {
        return this.http.delete(`http://localhost:56147/Employees/${employeeId}`);
    }

    addUser(payload: User) {
        return this.http.post<User>('http://localhost:56147/Employees/', payload);
    }

    updateUser(payload: User, employeeId: number) {
        return this.http.put<User>(`http://localhost:56147/Employees/${employeeId}`, payload);
    }

  
}