import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor() { }

    delay() {
        return timer(1000);
    }
}