// Import dependencies
const express=require('express');
const router=express.Router();

// Import Controller
const UsersController = require("../controller/UsersController")


// Route Path
router.post("/registration", UsersController.registration);
router.post("/login", UsersController.login);
router.post("/profile-update", UsersController.profileUpdate);


module.exports=router;