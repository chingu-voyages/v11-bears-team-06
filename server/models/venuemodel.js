const mongoose = require('mongoose')


const venueSchema = new mongoose.Schema({
  name: String,
  street: String,
  city: String,
  district: String,
  state: String,
  zip: String,
  country: String,
  latlong: String,
  url: String,
  photo: String,
  pluscode: String
});

const VenueModel = mongoose.model('Venue', venueSchema);

module.exports = VenueModel;
