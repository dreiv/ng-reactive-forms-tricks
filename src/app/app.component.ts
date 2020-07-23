import { Component } from '@angular/core';
import {
  FormControl,
  AbstractControl,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  control = new FormControl(null, {
    validators: Validators.minLength(4),
    updateOn: 'blur'
  });
}

function dummyValidator(control: AbstractControl): ValidationErrors | null {
  console.log('checking...');

  return null;
}
