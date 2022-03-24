const apiRouter = require('express').Router();
const gamesRouter = require('./gamesRouter');

apiRouter.use('/games', gamesRouter);

module.exports = apiRouter;
