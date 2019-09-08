const express = require('express');
const router = express.Router();




/*  Route:      /leagues
**  Method:     POST
**  Status:     Public
**  Note:       This route will accept a list of zip codes and return all leagues that match a provided zip code.
*/
router.post('/', (req, res)=> {
    const { zipCodes } = req.body
    return res.send({ msg: zipCodes });
})


module.exports = router;