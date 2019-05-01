/**
 *  @author Rayhan Kasli
 *  @createdDate 06-04-2019
 *  @discription  This function use for validation
 */
import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * It checks the control value of form name is valid or not.
 */
export function validateName(control: AbstractControl): ValidationErrors {
    if (!/^[^-\s0-9]([0-9]?[a-zA-Z]*)+(([\s]?[\&\.]?[\s]+)?[\s\.\-\&\@\:?]?[a-zA-Z0-9\#\+]+)*(\.)?\s*$/.test(control.value)) {
        return { invalidcharacters: true };
    }
    return null;
}

/**
 * Validates chips
 * @param control 
 * @returns true if chips charecter length more then 20 
 */
export function validateChips(control: AbstractControl): ValidationErrors {
  
    if (control.value !== '' && (control.value.length <= 20)) {
        return { invalidchips: 'allow only 20 charecters' };
    }
    return null;
}