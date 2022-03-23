const Games = require('../models/games')

const getGames = async (req, res, next) => {
    try{
        const id = req.params.id;
        const gameFound = await Games.find({_id:id})
        const soloGame = gameFound[0]
        res.status(200).send({soloGame})
    }
    catch(error){
        next(error);

    }
}
module.exports = {getGames}