// Import dependencies
const express=require('express');
const router=express.Router();

// Import Middleware
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware")

// Import Controller
const UsersController = require("../controller/UsersController")
const TasksController = require("../controller/TasksController")


// Route Path
router.post("/registration", UsersController.registration);
router.post("/login", UsersController.login);
router.post("/profile-update", AuthVerifyMiddleware, UsersController.profileUpdate);

router.post("/create-task", AuthVerifyMiddleware, TasksController.createTask);
router.get("/update-task/:id/:status", AuthVerifyMiddleware, TasksController.updateTaskStatus);
router.get("/filter-task-by-status/:status", AuthVerifyMiddleware, TasksController.filterTaskByStatus);


module.exports=router;