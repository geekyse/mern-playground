import { Command } from 'commander';
import dotenv from 'dotenv';
import { createAdmin } from './cli/command/create-admin';


async function app() {
// initialize configuration
  const result = await dotenv.config();


  if (result.error) {
    throw result.error;
  }

  console.log(result.parsed);
  const {dbConnection} = require("./server/db");
  await dbConnection();
  await command();
}


async function command() {
  const program = new Command();

  program.version('0.0.1');

  await program.option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size');

  if (program.debug) console.log(program.opts());
  console.log("---------------------1----------------")
  await program.command('create-admin')
    .description('create first admin user')
    .action(createAdmin);

  program.parse(process.argv);
}

app();
