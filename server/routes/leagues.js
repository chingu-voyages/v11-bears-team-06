const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-unfetch');
require('dotenv').config();




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


module.exports = router;