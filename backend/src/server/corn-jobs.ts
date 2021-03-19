import { exportMatchersToCSV } from '../modules/system/customer/export';
import { CronJob } from 'cron';

// https://www.npmjs.com/package/cron
export const setupCronJobs = async () => {
   //                   ┌───────────── minute (0 - 59)
   //                   │ ┌───────────── hour (0 - 23)
   //                   │ │ ┌───────────── day of the month (1 - 31)
   //                   │ │ │ ┌───────────── month (1 - 12)
   //                   │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
   //                   │ │ │ │ │                                   7 is also Sunday on some systems)
  let job = new CronJob('30 * * * * *', () => exportMatchersToCSV(), null, true);
  job.start();
};
