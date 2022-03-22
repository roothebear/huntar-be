const app = require('./app')

const { PORT = 3050 } = process.env;

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
});