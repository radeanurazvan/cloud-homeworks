module.exports = class Result {
    #isFailure = true;
    #error = "";
    #value;

    constructor(isFailure, error, value = null) {
        this.#isFailure = isFailure;
        this.#error = error;
        this.#value = value;
    }

    get isSuccess() {
        return !this.#isFailure;
    }

    get isFailure() {
        return this.#isFailure;
    }

    get error() {
        return this.#error;
    }

    static success() {
        return new Result(false);
    }

    static success(value) {
        return new Result(false, null, value);
    }

    static failure(error) {
        return new Result(true, error);
    }

    static fromValidationResult(validationResult) {
        const firstError = validationResult.getErrors()[0];
        if(!firstError) {
            return Result.success();
        }

        return Result.failure(`${firstError.param}: ${firstError.message}`);
    }

    static fromValidationResult(validationResult, value) {
        const firstError = validationResult.getErrors()[0];
        if(!firstError) {
            return Result.success(value);
        }

        return Result.failure(`${firstError.param}: ${firstError.message}`);
    }

    onSuccess(callback) {
        if(this.isSuccess) {
            callback(this.#value);
        }

        return this;
    }

    map(callback) {
        if(this.isFailure) {
           return this; 
        }

        return new Result(false, null, callback(this.#value));
    }

    onFailure(callback) {
        if(this.isFailure) {
            callback(e);
        }

        return this;
    }

    httpCode(onOkCode) {
        return this.isFailure ? 400 : onOkCode;
    }

    toPlain() {
        return {
            isFailure: this.isFailure,
            isSuccess: this.isSuccess,
            error: this.error,
            value: this.#value
        };
    }
}