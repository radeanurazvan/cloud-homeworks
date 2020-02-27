import { FormField } from "../form-field";
import { ValidationResult } from "./validation-result";
import { Validator } from './validator';

export class EmailValidator extends Validator {
    private regex: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    public validate(field: FormField<any>): ValidationResult {
        if(this.regex.test(field.value)) {
            return ValidationResult.successfull();
        }

        return ValidationResult.failure(`${field.capitalizedName} is not a valid email!`);
    }
}