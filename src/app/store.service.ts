import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private val: BehaviorSubject<number>;
  val$: Observable<number>;

  constructor() {
    this.val = new BehaviorSubject(2);
    this.val$ = this.val.asObservable();
  }

  getValue(): number {
    return this.val.getValue();
  }

  update(value: number): void {
    console.log('updated store value', value);
    this.val.next(value);
  }
}
