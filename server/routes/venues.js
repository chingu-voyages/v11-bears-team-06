require('dotenv').config();
const { Router } = require('express');
const router = Router();
const fetch = require('isomorphic-unfetch');
const mongoose = require('mongoose')

router.route('/venues').get(getVenues);
router.route('/venues/:id').get(getVenues);
router.route('/venues').post(insertVenue);
router.route('/venues').put(updateVenue);
router.route('/venues').delete(deleteVenue);

function getVenues(req, res) {
  const Venue = mongoose.model('Venue');

  if(req.params.id)
  {
    Venue.findById( req.params.id, (err, venue) => {
      if (err) return console.error(err);
      res.status(200).json({ data: venue });      
    });
  }else
    Venue.find( (err, venues) => {
      if (err) return console.error(err);
      console.log(venues);
      res.status(200).json({ data: venues });
    });
}

function insertVenue(req, res) {
  const Venue = mongoose.model('Venue');

  let Venue = new Venue(
    {
        name: req.body.name,
        street: req.body.street,
        city: req.body.city,
        district: req.body.district,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        latlong: req.body.latlong,
        url: req.body.url,
        photo: req.body.photo,
        pluscode: req.body.pluscode
    }
  );

  Venue.save(function (err) {
      if (err) {
          return next(err);
      }
      res.send('venue Created successfully')
  });

}

function updateVenue(req, res) {
    const Venue = mongoose.model('Venue');
    Venue.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, venue) {
    res.send('venue updated successfully');
  });
}

function deleteVenue(req, res) {
    const Venue = mongoose.model('Venue');
    Venue.findByIdAndRemove(req.params.id, function (err) {
    res.send('venue deleted successfully');
  });
}


module.exports = {
  getVenues: getVenues,
  insertVenue: insertVenue,
  updateVenue: updateVenue,
  deleteVenue: deleteVenue,
  router: router
};

