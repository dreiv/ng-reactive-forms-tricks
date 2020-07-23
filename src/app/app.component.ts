import { Component } from '@angular/core';
import { FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  control = new FormControl(null, dummyValidator);
}

function dummyValidator(control: AbstractControl): ValidationErrors | null {
  console.log('checking...');

  return null;
}
