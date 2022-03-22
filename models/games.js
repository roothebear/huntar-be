const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema({
  game_name: { type: String, required: true },
  assets: [
    {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
      asset_name: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("games", gamesSchema);
