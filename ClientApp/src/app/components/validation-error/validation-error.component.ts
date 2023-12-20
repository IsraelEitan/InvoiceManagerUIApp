import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.css']
})
export class ValidationErrorComponent {
  @Input() control!: AbstractControl;

  getErrors(): string[] {
    const errors: string[] = [];
    if (this.control && this.control.errors) {
      const controlErrors = this.control.errors;
      for (const key of Object.keys(controlErrors)) {
        switch (key) {
          case 'required':
            errors.push(`${this.fieldName} is required.`);
            break;
          case 'min':
            errors.push(`${this.fieldName} must be greater than or equal to ${controlErrors[key].min}.`);
            break;
        }
      }
    }
    return errors;
  }
  get fieldName(): string {
    return 'Field'; // Default value
  }
}
