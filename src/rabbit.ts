const queueName = 'scrap_publish';
const ErrorQueueName = 'scrap_publish_error';
const bail = (err) => {
    console.error(err);
    process.exit(1);
};
let connection = null;
let channel = null;

// Publisher
const publishToErrorQueue = (message) => {
    channel.sendToQueue(ErrorQueueName, Buffer.from(message));
};

const consume = async () => {
    channel.consume(queueName, async (msg) => {
        let jsonMessage = JSON.parse(msg.content.toString());
        await importProduct(jsonMessage);
        channel.ack(msg);
    });
};

export const consumer = async () => {
    try {

        console.log(process.env.RABBITMQ_CONNECTION);
        amqp.connect(process.env.RABBITMQ_CONNECTION, function(err, conn) {
            if (err != null) bail(err);
            connection = conn;
            conn.createChannel(on_open);

            async function on_open(err, ch) {
                if (err != null) bail(err);
                ch.assertQueue(queueName);
                // only consume one message per time
                ch.prefetch(5);
                channel = ch;
                await consume();
            }
        });
    } catch (e) {
        console.log(e);
    }
};