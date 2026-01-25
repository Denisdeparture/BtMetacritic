import { AbstractControl, ValidatorFn } from '@angular/forms';

export function complexPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;
    if (!password) {
      return null;
    }

    // has 1 leeter, 1 number и 1 special symbol
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasLetter && hasNumber && hasSpecialChar) {
      return null; // valid password
    }

    return { simplePassword: true }; // not valid passoword
  };
}
