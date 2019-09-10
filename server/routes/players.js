const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose')

router.route('/players').get(getPlayers);
router.route('/players/:id').get(getPlayers);
router.route('/players').post(insertPlayer);
router.route('/players').put(updatePlayer);
router.route('/players').delete(deletePlayer);

const playerSchema = new mongoose.Schema({
  name: String,
  handle: String
});
const Player = mongoose.model('Player', playerSchema);


function getPlayers(req, res) {
  if(req.params.id)
  {
    Player.findById( req.params.id, (err, players) => {
      if (err) return console.error(err);
      console.log("find by id",players);
      res.status(200).json({ data: players });
    });
  }else
    Player.find( (err, players) => {
      if (err) return console.error(err);
      console.log(players);
      res.status(200).json({ data: players });
    });
}

function insertPlayer(req, res) {
  let player = new Player(
    {
        name: req.body.name,
        handle: req.body.handle
    }
  );

  player.save(function (err) {
      if (err) {
          return next(err);
      }
      res.send('Player Created successfully')
  });

}

function updatePlayer(req, res) {
  Player.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
    res.send('Player updated successfully');
  });
}

function deletePlayer(req, res) {
  Product.findByIdAndRemove(req.params.id, function (err) {
    res.send('Player deleted successfully');
  });
}


module.exports = {
  getPlayers: getPlayers,
  insertPlayer: insertPlayer,
  updatePlayer: updatePlayer,
  deletePlayer: deletePlayer,
  router: router
};