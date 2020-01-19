export class NewUser {
    public name: string;
    public email: string;
    private password: string;
    public passwordHash: string;

    constructor({
        name: name,
        email: email,
        password: password
    }) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
