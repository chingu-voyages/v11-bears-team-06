const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose')

router.route('/players').get(getPlayers);
router.route('/players').post(insertPlayer);
router.route('/players').put(updatePlayer);
router.route('/players').delete(deletePlayer);
router.route('/players/:id').get(getPlayers);
router.route('/players/:id').put(updatePlayer);
router.route('/players/:id').delete(deletePlayer);
router.route('/players/delete/:id').get(deletePlayer);


function getPlayers(req, res) {
  const Player = mongoose.model('Player');

  if(req.params.id){
    Player.findById( req.params.id, (err, players) => {
      if (err) return console.error(err);
      console.log("find by id",players);
      res.status(200).json({ data: players });
    });
  }else
    Player.find()
    .sort('-name')
    .exec( (err, players) => {
      if (err) return console.error(err);
      console.log(players);
      res.status(200).json({ data: players });
    });
}

function insertPlayer(req, res) {
  const Player = mongoose.model('Player');

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
  const Player = mongoose.model('Player');

  Player.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, player) {
    res.send('Player updated successfully');
  });
}

function deletePlayer(req, res) {
  const Player = mongoose.model('Player');

  Player.findByIdAndRemove(req.params.id, function (err) {
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