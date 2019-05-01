/**
 * @author: Bhumi Desai
 * @created date: 25/03/2019
 * @description: Custom validations are done here
 */
import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * It checks the control value of form is string or not.
 * This means that it accepts only string.
 * @author: Bhumi Desai
 * @created date: 25/03/2019
 */
export function validateCharacters (control: AbstractControl): ValidationErrors {
    // !/^[^-\s][a-zA-Z ]+$/.test(control.value)   control.value.search(/\S|$/)
    // if (!/^[a-zA-Z ]*$/.test(control.value)) {
    //     return { invalidcharacters: true };
    // } else if (!/\S|$/.test(control.value)) {
    //     return { invalidspace: true };
    // }
    // return null;
    if (!/^[^-\s][a-zA-Z ]+$/.test(control.value)) {
        return { invalidcharacters: true };
    }
    return null;
}

/**
 * It checks the control value of form is number or not.
 * This means that it accepts only number.
 * And also it checks if the number is less than 50 or not.
 *  the definition of ValidationErrors, it has the below index signature
 *   type ValidationErrors = {
 *      [key: string]: any;
 *  };
 * @author: Bhumi Desai
 * @created date: 25/03/2019
 */
export function validateOnlyNumber (control: AbstractControl): ValidationErrors {
    if (/^\d+$/.test(control.value) && (control.value > 50 || control.value < 1)) {
        return { invalidvacancy: true };
    }

    if (!/^\d+$/.test(control.value)) {
        return { invalidnumber: true };
    }
    return null;
}

/**
 * Validates number and plus
 * It checks whether it is number or not.
 * Also allows one single plus symbol
 * @author: Bhumi Desai
 * @created date: 25/03/2019
 */
export function validateNumberAndPlus (control: AbstractControl): ValidationErrors {

    if ((!/^[0-9]*\+?$/.test(control.value)) && (!/^\d+$/.test(control.value))) {
        return { invalidnumbers: true };
    } else {
        if ((/^\d+$/.test(control.value) && (control.value > 30 || control.value < 1))) {
            return { invalidRange: true };
        }

        if ((control.value.indexOf('+') > 0)) {
            const trimEndPoint: number = control.value.indexOf('+');
            const dumNumber: string = control.value;
            const numString: string = dumNumber.substr(0, trimEndPoint);

            const myNumber: number = +numString;
            if (myNumber > 30) {
                return { invalidRange: true };
            }

        }
    }

    return null;
}
/**
 * Validates starting with only number and does not allow negative values
 * It checks whether it is number or not.
 * @author: Bhumi Desai
 * @created date: 09/04/2019
 */
export function validateSalary (control: AbstractControl): ValidationErrors {
    if (!/^[1-9][a-zA-Z0-9 _.-]*$/.test(control.value)) {
        return { invalidsalary: true };
    }
    return null;
}

