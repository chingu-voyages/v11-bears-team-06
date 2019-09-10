const express = require('express');
const router = express.Router();


/*  Route:      /venue
**  Method:     GET
**  Status:     Public
**  Note:       Stand in route just for setting up the route
*/
router.get('/', (req,res)=>{
    return res.send({msg: "This will be the venue route"});
});


module.exports = router;