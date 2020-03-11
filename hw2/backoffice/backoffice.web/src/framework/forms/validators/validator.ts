import { ValidationResult } from "./validation-result";
import { FormField } from "../form-field";

export abstract class Validator {
    public abstract validate(field: FormField<any>): ValidationResult;
}