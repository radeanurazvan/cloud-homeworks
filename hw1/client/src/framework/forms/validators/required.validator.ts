import { Validator } from './validator';
import { ValidationResult } from './validation-result';
import { FormField } from '../form-field';

export class RequiredValidator extends Validator {
    public validate(field: FormField<any>): ValidationResult {
        if(field.value) {
            return ValidationResult.successfull();
        }

        return ValidationResult.failure(`${field.capitalizedName} is required!`);        
    }
}