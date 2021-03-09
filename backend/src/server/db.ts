import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';


export const dbConnection = async () => {
  // singleton design pattern
  let connection;

  if (connection) {
    return connection;
  }
  mongoose.plugin(slug);
  connection = await mongoose.connect('mongodb://root:mongo@localhost:27117/e-commerce?authSource=admin', {
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
  return connection;
};
