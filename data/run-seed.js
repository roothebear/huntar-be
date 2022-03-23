const seedDB = require('./seed');
const testData = require('./test-data.json');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/ScavengeARtest').then(() => {
    return seedDB(testData)
})
.then(() => {
    return mongoose.disconnect()
})
.then(() => {
    console.log(`successfully disconnected`)
})
.catch((err) => console.log(err))
