import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
import Redis, { RedisOptions } from 'ioredis';

let mongoConn = null;
let redisConn = null;

export const dbConnection = async () => {
  await redisConnection();
  await mongoConnection();
};


export const redisConnection = () => {
  // singleton design pattern

  if (redisConn) return redisConn;

  const options: RedisOptions = {
    keyPrefix: process.env.REDIS_PREFIX,
    connectTimeout: parseInt(process.env.REDIS_TIMEOUT, 10),
    maxRetriesPerRequest: parseInt(process.env.REDIS_MAX_RETRIES, 10),
  };

  const redisURI: string = process.env.REDIS_URI;
  console.log(`redisURI: ${redisURI}`);
  const redis: Redis.Redis = new Redis(redisURI, options);

  redis.on('error', (error: Error): void => {
    console.error(`Redis : connection ${JSON.stringify(error)}`);
  });

  redis.on('connect', (): void => {
    console.info('Redis : connected');
  });

  redis.on('reconnecting', (): void => {
    console.warn('Redis : reconnecting');
  });

  redis.on('end', (): void => {
    console.warn('Redis : disconnected');
  });
  redisConn = redis;
  return redisConn;
};

export const mongoConnection = async () => {
  // singleton design pattern
  if (mongoConn) return mongoConn;

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
