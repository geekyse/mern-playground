import amqp from 'amqplib/callback_api';

export const Publish = async (msg, queue) => {
    amqp.connect('amqp://user:pass@localhost/', function (err, conn) {
        conn.createChannel((err, ch) => {
            ch.assertQueue(queue, {durable: false});
            ch.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
            console.log('message was sent successfully !');
        });
        setTimeout(() => {
            conn.close();
            process.exit(0);
        }, 500);
    });
};

