// Import dependencies
const express=require('express');
const router=express.Router();

// Import Middleware
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware")

// Import Controller
const UsersController = require("../controller/UsersController")


// Route Path
router.post("/registration", UsersController.registration);
router.post("/login", UsersController.login);
router.post("/profile-update", AuthVerifyMiddleware, UsersController.profileUpdate);


module.exports=router;