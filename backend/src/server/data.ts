export const saveToCSV = (jsonMessage: any, path: any, headers: any) => {
  const csvWriter = require('csv-writer').createObjectCsvWriter({ path: path, header: headers, append: true });
  // save/append data to csv file
  csvWriter.writeRecords(jsonMessage).then(() => console.log('data saved/appended successfully :)'));
}
