const { connect, connection } = require("mongoose");
const { config } = require("dotenv");

module.exports = () => {
  const uri = process.env.DB_URI;
  console.log(uri);
  connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Connection estabislished with MongoDB");
    })
    .catch((error) => console.log(error.message));
};