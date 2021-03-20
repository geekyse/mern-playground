import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
import Redis, { RedisOptions } from 'ioredis';

let redisConn = null;
let mongoConn;

export const dbConnection = async () => {
  await mongoConnection();
  await redisConnection();
};

const mongoConnection = async () => {
  // singleton design pattern

  if (mongoConn) {
    return mongoConn;
  }
  mongoose.plugin(slug);
  // @ts-ignore
  mongoConn = await mongoose.connect(process.env.DB_CONNECTION_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    connectTimeoutMS: 50,
  });

  mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      converted.id = converted._id;
      // delete converted._id;
    },
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error: MongoDb :('));
  db.once('open', () => {
    console.log('we\'re connected!');
  });
  return mongoConn;
};


const redisConnection = async () => {
  // singleton design pattern

  if (redisConnection !== null) {
    return redisConnection;
  }
  const options: RedisOptions = {
    keyPrefix: process.env.REDIS_PREFIX,
    // @ts-ignore
    connectTimeout: parseInt(process.env.REDIS_TIMEOUT, 10),
    // @ts-ignore
    maxRetriesPerRequest: parseInt(process.env.REDIS_MAX_RETRIES, 10),
  };

  // @ts-ignore
  const redisURI: string = process.env.REDIS_URI;
  console.log(`redisURI: ${redisURI}`);
  const redis: Redis.Redis = new Redis(redisURI, options);

  redis.on('error', (error: Error): void => {
    console.error(`Redis :: connection ${JSON.stringify(error)}`);
  });

  redis.on('connect', (): void => {
    console.info('Redis :: connected');
  });

  redis.on('reconnecting', (): void => {
    console.warn('Redis :: reconnecting');
  });

  redis.on('end', (): void => {
    console.warn('Redis :: disconnected');
  });
  redisConn = redis;
  return redisConnection;
};
