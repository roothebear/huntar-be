const { ObjectId } = require('mongodb');
const Games = require('../models/games');

const getGames = async (req, res, next) => {
  try {
    //fetches id that is passed
    const id = req.params.id;
    // does the find req to db
    const gameFound = await Games.find({ _id: id });
    // converts arr to single obj
    const soloGame = gameFound[0];

    res.status(200).send({ soloGame });
  } catch (error) {
    next(error);
  }
};

const postGames = async (req, res, next) => {
  try {
    const newGame = new Games(req.body);
    const gameObject = await newGame.save();
    const objectId = gameObject._id;

    // const sendGame = req.body;
    // const gameSent = await Games.collection.insertOne(sendGame);
    // const singleGame = gameSent.insertedId;

    res.status(201).send({ objectId });
  } catch (error) {
    next(error);
  }
};
module.exports = { getGames, postGames };
