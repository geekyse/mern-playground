import amqp from 'amqplib';

export const publish = async (ch, queueNamePublish, messages: any[]) => {
  let promises = messages.map((msg) => {
    return ch.sendToQueue(queueNamePublish, Buffer.from(JSON.stringify(msg)));
  });
  await Promise.all(promises);
};

export const createChannel = async (queueNamePublish) => {
  // @ts-ignore
  const conn = await amqp.connect(process.env.RABBITMQ_CONNECTION);
  const ch = await conn.createChannel();
  await ch.assertQueue(queueNamePublish);
  return { conn, ch };
};

const Hello = (username, password) => {
  return username + password;
};