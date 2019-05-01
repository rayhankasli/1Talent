/**
 *  @author Rayhan KAsli
 *  @createdDate 06-04-2019
 *  @discription  This function use for validation
 */
import { AbstractControl, ValidationErrors } from '@angular/forms';
/**
 * It checks the control value of form name is valid or not.
 */
export function validateName(control: AbstractControl): ValidationErrors {
    if (!/^[^-\s]([0-9]?[a-zA-Z])+(([\s]?[\-\.]?[\s]+)?[\s\.\-?]?[a-zA-Z0-9]+)*(\.)?\s*$/.test(control.value)) {
        return { invalidcharacters: true };
    }
    return null;
}
