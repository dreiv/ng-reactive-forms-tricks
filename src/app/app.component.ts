import { StoreService } from './store.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  AbstractControl,
  ValidationErrors,
  Validators,
  FormGroup
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

  group = new FormGroup({
    disabled: new FormControl({ value: null, disabled: true })
  });

  blurControl = new FormControl(null, {
    validators: Validators.minLength(4),
    updateOn: 'blur'
  });

  lazyControl = new FormControl(null);

  storeControl: FormControl;

  constructor(private store: StoreService) {
    this.storeControl = new FormControl(this.store.getValue());
  }

  ngOnInit(): void {
    this.lazyControl.valueChanges
      .pipe(debounceTime(300), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.lazyControl.setErrors(Validators.minLength(3)(this.lazyControl));
      });

    this.store.val$.subscribe((val) =>
      this.storeControl.patchValue(val, { emitEvent: false })
    );
    this.storeControl.valueChanges.subscribe((value) =>
      this.store.update(value)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  submit(): void {
    console.log('sumbitted');
  }
}

function dummyValidator(control: AbstractControl): ValidationErrors | null {
  console.log('checking...');

  return null;
}
