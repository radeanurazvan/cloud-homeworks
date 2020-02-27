import { Subject } from "rxjs";
import { FormField } from "./form-field";

export abstract class Form {
    private successChannel: Subject<void> = new Subject<void>();
    private failChannel: Subject<string[]> = new Subject<string[]>();

    protected abstract getFields(): FormField<any>[];

    public submit(): void {
        const failedFields = this.getFields().filter((f: FormField<any>) => f.isInvalid);
        if(failedFields.length) {
            const errors = failedFields.map((ff: FormField<any>) => ff.errors)
                .reduce((previous: string[], current: string[]) => [...previous, ...current]);
            this.onFail.next(errors);
            return;
        }

        this.onSuccess.next();
    }

    public get onSuccess(): Subject<void> {
        return this.successChannel;
    }

    public get onFail(): Subject<string[]> {
        return this.failChannel;
    }
}