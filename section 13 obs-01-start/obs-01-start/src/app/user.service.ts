import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  activtedEmitter = new Subject<boolean>();

  constructor() { }
}
