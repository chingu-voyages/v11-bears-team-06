const mongoose = require('mongoose')


const playerSchema = new mongoose.Schema({
  name: String,
  handle: String
});
const PlayerModel = mongoose.model('Player', playerSchema);

module.exports = PlayerModel;