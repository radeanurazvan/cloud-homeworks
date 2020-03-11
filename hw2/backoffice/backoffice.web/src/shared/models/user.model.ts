export class User {
    public name: string;
    public occupation: string;

    public constructor(name: string, occupation: string) {
        this.name = name;
        this.occupation = occupation;
    }

    public static guest(): User {
        return new User('Guest', '');
    }

    public get initials(): string {
        return this.name.split(' ')
            .map((w: string) => w[0].toUpperCase())
            .join('');
    }
}