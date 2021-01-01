
export function dbConnection (){
    const mongoose = require('mongoose');

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 50,
        authSource:"admin"
    };

    mongoose.connect('mongodb://root:mongo@localhost:27117/e-commerce?authSource=admin', options,function(error) {

        return "error while connecting"
    });

    const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'Mongo connection error :('));
    db.once('open', () => {console.log('Mongo is successfully connected :)');});
}