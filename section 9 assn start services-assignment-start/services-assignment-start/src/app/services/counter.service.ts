import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  count = 0;
  counterUpdated = new EventEmitter<number>();

  constructor() { }

  incrementCounter() {
    this.count += 1;
    this.counterUpdated.emit(this.count);
  }
}
