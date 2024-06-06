import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';

export function stringMatchValidator(
  string_one: string,
  string_two: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const str_one = formGroup.get(string_one);
    const str_two = formGroup.get(string_two);
    if (str_one && str_two && str_one.value !== str_two.value) {
      return { stringMismatch: true };
    }
    return null;
  };
}
