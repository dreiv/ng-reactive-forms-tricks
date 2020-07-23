import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  AbstractControl,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  blurControl = new FormControl(null, {
    validators: Validators.minLength(4),
    updateOn: 'blur'
  });

  lazyControl = new FormControl(null);

  ngOnInit(): void {
    this.lazyControl.valueChanges
      .pipe(debounceTime(300), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.lazyControl.setErrors(Validators.minLength(3)(this.lazyControl));
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}

function dummyValidator(control: AbstractControl): ValidationErrors | null {
  console.log('checking...');

  return null;
}
