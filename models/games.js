const mongoose = require('mongoose');

const assetsSchema = new mongoose.Schema({
  
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    asset_name: { type: String, required: true },
 
})
//model determines collection
const gamesSchema = new mongoose.Schema({
  game_name: { type: String, required: true },
  assets: {
     1: {type: assetsSchema, required: true},
     2: {type: assetsSchema, required: true},
     3: {type: assetsSchema, required: true},
     4: {type: assetsSchema, required: true},
     5: {type: assetsSchema, required: true},
  }
});

module.exports = mongoose.model('games', gamesSchema);


