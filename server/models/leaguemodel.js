const mongoose = require('mongoose')


const leagueSchema = new mongoose.Schema({
  name: String,
  sport: String,
  members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
  }]
});

const LeagueModel = mongoose.model('League', leagueSchema);


module.exports = LeagueModel;