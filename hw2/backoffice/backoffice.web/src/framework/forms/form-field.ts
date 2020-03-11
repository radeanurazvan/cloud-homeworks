import { Validator, ValidationResult } from "./validators";

export class FormField<T> {
    private validators: Validator[] = [];

    public constructor(private _name: string, private _value: T) {
    }

    public validatedBy(validator: Validator): FormField<T> {
        this.validators.push(validator);
        return this;
    }

    public get name(): string {
        return this._name;
    }

    public get capitalizedName(): string {
        return this._name[0].toUpperCase() + this._name.substr(1);
    }

    public get value(): T {
        return this._value;
    }

    public get isValid(): boolean {
        return !this.isInvalid;
    }

    public get isInvalid(): boolean {
        return this.validators.some((v: Validator) => v.validate(this).isFailure)
    }

    public get errors(): string[] {
        return this.validators.map((v: Validator) => v.validate(this))
            .filter((vr: ValidationResult) => vr.isFailure)
            .map((vr: ValidationResult) => vr.errors)
            .reduce((previous: string[], current: string[]) => [...previous, ...current]);
    }
}