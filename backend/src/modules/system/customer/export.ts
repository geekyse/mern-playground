import { createChannel, publish } from '../../../util/rabbitmq';
import { User } from '../../../models/User';
import { saveToCSV } from '../../../server/data';
const publishQueueName = 'export-phones-data';

export async function toCsv(req: any, res: any) {
  const { ch } = await createChannel(publishQueueName);

  const totalMatchers = await User.countDocuments();
  const batchSize = 500;
  let totalBatches = Math.ceil(totalMatchers / batchSize);
  let counter = 0;

  console.log(`[x] Total matchers: ${totalMatchers} \n[x] Total Batches: ${totalBatches} \n[x] Batch Size: ${batchSize}`);

  try {
    while (counter <= totalBatches) {
      console.log(`[x] Started Batch number: ${counter}`);

      // find Matchers using filters
      // const Matchers = await Matcher.find()
      //   .where('isMatching').equals(req.body.isMatching)
      //   .where('isChecked').equals(req.body.isChecked)
      //   .limit(batchSize).skip(skip).lean();

      // await publish(ch, publishQueueName, [Matchers]);


      let data = [{
        'name': 's21 ultra 256',
        'imei': 324123412341234123,
      }];
      await publish(ch, publishQueueName, data);
      counter++;
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
  res.json('Exporting data ..');
}

export const exportMatchersToCSV = async () => {
  const { ch } = await createChannel(publishQueueName);
  await ch.consume(publishQueueName, (message: any) => {

    let jsonMessage = JSON.parse(message.content.toString());

    saveToCSV(jsonMessage, `${__dirname}/file.csv`,
      [
        { id: 'name', title: 'Name' },
        { id: 'imei', title: 'IMEI' },
      ],
    );
    ch.ack(message);
  });
};
