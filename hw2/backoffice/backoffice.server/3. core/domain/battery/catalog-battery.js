const newUuid = require('uuid/v1');

module.exports = class CatalogBattery {
    #id;
    #definition;
    #stock;
    #price;

    constructor(definition, stock, price, id = newUuid()) {
        this.#id = id;
        this.#definition = definition;
        this.#stock = stock;
        this.#price = price;
    }

    decreaseStock(quantity) {
        const canDecreaseStock = quantity > 0 && quantity <= this.#stock;
        if(!canDecreaseStock) {
            return;
        }

        this.#stock -= quantity;
    }

    toOrderItem() {
        return {
            id: this.#id,
            definition: this.#definition,
            price: this.#price,
        };
    }

    changePrice(price) {
        this.#price = price;
    }

    changeStock(stock) {
        this.#stock = stock;
    }

    get id() { return this.#id; }
    get definition() { return this.#definition; }
    get stock() { return this.#stock; }
    get price() { return this.#price; }
}
