const gamesRouter = require("express").Router();
const {getGames} = require("../controllers/gameController")
gamesRouter.get('/:id', getGames)

module.exports = gamesRouter;
