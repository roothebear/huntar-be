const { connect, connection} = require('mongoose')
const {config} = require('dotenv')

module.exports = () => {
    const uri = process.env.DB_URI;
    console.log(uri)
    connect(uri, {
        // dbName: process.env.DB_NAME,
        // user: process.env.DB_USER,
        // pass: process.env.DB_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connection estabislished with MongoDB');
    })
    .catch(error => console.error(error.message));
}


