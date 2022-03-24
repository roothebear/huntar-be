const gamesRouter = require('express').Router();
const { getGames, postGames } = require('../controllers/gameController');
gamesRouter.get('/:id', getGames);
gamesRouter.post('/', postGames);
module.exports = gamesRouter;
