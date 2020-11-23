
function dbConnection (){
    const mongoose = require('mongoose');

    mongoose.connect('mongodb://root:mongo@localhost:27117/shop?authSource=admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 50
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Mongo connection error :('));
    db.once('open', () => {console.log('Mongo is successfully connected :)');});
}

export { dbConnection}
