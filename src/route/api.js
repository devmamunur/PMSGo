// Import dependencies
const express=require('express');
const router=express.Router();

const UsersController = require("../controller/UsersController")

router.post("/registration", UsersController.registration);


module.exports=router;