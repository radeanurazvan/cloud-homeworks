export class ValidationResult {
    private _isSucccess: boolean = false;
    private _errors: string[] = [];

    private constructor(isSuccess: boolean, errors: string[]) {
        this._isSucccess = isSuccess;
        this._errors = errors || [];
    }

    public static successfull(): ValidationResult {
        return new ValidationResult(true, []);
    }

    public static failure(...errors: string[]): ValidationResult {
        return new ValidationResult(false, errors);
    }

    public get isSuccess(): boolean {
        return this._isSucccess;
    }

    public get isFailure(): boolean {
        return !this._isSucccess;
    }

    public get errors(): string[] {
        return this._errors;
    }
}