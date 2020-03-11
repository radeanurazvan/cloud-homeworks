const newUuid = require('uuid/v1');

module.exports = class Customer {
    #id;
    #name;
    #email;
    #isLoyal;

    constructor(name, email, id = newUuid(), isLoyal = false) {
        this.#id = id;
        this.#name = name;
        this.#email = email;
        this.#isLoyal = isLoyal;
    }

    toggleLoyalty() {
        this.#isLoyal = !this.#isLoyal;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get email() { return this.#email; }
    get isLoyal() { return this.#isLoyal; }
}