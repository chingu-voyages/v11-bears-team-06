require('dotenv').config();
const { Router } = require('express');
const router = Router();
const fetch = require('isomorphic-unfetch');
const mongoose = require('mongoose')

router.route('/leagues').get(getleagues);
router.route('/leagues/:id').get(getleagues);
router.route('/leagues').post(insertLeague);
router.route('/leagues').put(updateLeague);
router.route('/leagues').delete(deleteLeague);


/*  Route:      /leagues
**  Method:     POST
**  Status:     Public
**  Note:       This route accepts one zip code and miles, and return all leagues that match a provided zip code.
*/
router.post('/', async (req, res)=> {
    const { zipCode, miles } = req.body
    if (!zipCode || !miles) return res.status(400).send({msg: 'Missing zip code or miles'});
    try {
        const fetchRes = await fetch(`https://www.zipcodeapi.com/rest/${process.env.ZIPCODE_API}/radius.json/${zipCode}/${miles}/mile`,{
            method: 'GET'
        });
        const data = await fetchRes.json();
        if (data.zip_codes && data.zip_codes.length>0) {
            const zipCodes = data.zip_codes.map(addr => addr.zip_code);
            return res.send(zipCodes);
        } else {
            res.status(400).send({msg: 'No zip codes found'});
        }
        
    } catch(err) {
        res.status(400).send({msg: err});
    }
})



function getleagues(req, res) {
  const League = mongoose.model('League');

  if(req.params.id)
  {
    League.findById( req.params.id, (err, league) => {
      if (err) return console.error(err);
      //the schema sets a relationship between league and players.
      //populate will load the related players into the League object
      League.populate(league, { path: 'members' }).then( l => res.status(200).json({ data: l }) );
      
    });
  }else
    League.find( (err, leagues) => {
      if (err) return console.error(err);
      console.log(leagues);
      res.status(200).json({ data: leagues });
    });
}

function insertLeague(req, res) {
    const League = mongoose.model('League');

  let League = new League(
    {
        name: req.body.name,
        street: req.body.name,
        city: req.body.name,
        state: req.body.name,
        zip: req.body.name
    }
  );

  League.save(function (err) {
      if (err) {
          return next(err);
      }
      res.send('League Created successfully')
  });

}

function updateLeague(req, res) {
    const League = mongoose.model('League');
  League.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, league) {
    res.send('League updated successfully');
  });
}

function deleteLeague(req, res) {
    const League = mongoose.model('League');
    League.findByIdAndRemove(req.params.id, function (err) {
    res.send('League deleted successfully');
  });
}


module.exports = {
  getleagues: getleagues,
  insertLeague: insertLeague,
  updateLeague: updateLeague,
  deleteLeague: deleteLeague,
  router: router
};

