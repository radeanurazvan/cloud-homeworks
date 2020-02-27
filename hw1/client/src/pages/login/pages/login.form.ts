import { Form, FormField, RequiredValidator, EmailValidator } from "@framework";

export class LoginForm extends Form {
    public email: string;
    public password: string;

    protected getFields(): FormField<any>[] {
        const email = new FormField<string>("email", this.email)
            .validatedBy(new RequiredValidator())
            .validatedBy(new EmailValidator());

        const password = new FormField<string>("password", this.password)
            .validatedBy(new RequiredValidator());

        return [email, password];
    }
}