const amqp = require("amqplib");

module.exports = class MessageBus {
    #channelPromise;

    constructor(config) {
        this.#channelPromise = amqp.connect(config.connectionStrings.amqp)
            .then(conn => conn.createChannel());
    }

    async publish(queue, message) {
        const channel = await this.#channelPromise;
        channel.assertQueue(queue);

        const serializedMessage = JSON.stringify(message);
        console.log("publishing message", serializedMessage);
        
        channel.sendToQueue(queue, Buffer.from(serializedMessage));
    }

    async subscribe(queue, callback) {
        const channel = await this.#channelPromise;
        channel.assertQueue(queue);
        channel.consume(queue, message => {
            const parsedMessage = JSON.parse(message.content.toString());
            console.log("consuming message", parsedMessage);

            callback(parsedMessage);
            channel.ack(message);
        });
    }
}
