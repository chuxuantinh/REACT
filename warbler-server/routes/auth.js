const express             = require('express'),
       router             = express.Router();

const { signup, signin } = require("../handlers/auth");
      

//if there is any kind of post request to /signup then I want to run my signup function
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
