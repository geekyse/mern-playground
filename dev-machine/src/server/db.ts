import 'reflect-metadata';
import {createConnection} from 'typeorm';

let connection;

// create singleton db connection
const createDbConnection = async () => {

    if (connection) {
        return connection;
    }
    connection = await createConnection();
    return connection;
};

export {createDbConnection};