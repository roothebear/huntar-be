const { connect } = require('mongoose');

module.exports = () => {
  const uri = process.env.DB_URI;
  connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connection established with MongoDB');
    })
    .catch((error) => console.log(error.message));
};
