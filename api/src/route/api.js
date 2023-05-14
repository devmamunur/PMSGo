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
router.get("/profile-details", AuthVerifyMiddleware, UsersController.profileDetails);

router.get("/recover-verify-email/:email",UsersController.RecoverVerifyEmail);
router.get("/recover-verify-otp/:email/:otp",UsersController.RecoverVerifyOTP);
router.post("/recover-reset-pass",UsersController.RecoverResetPass);

router.post("/task", AuthVerifyMiddleware, TasksController.createTask);
router.post("/task/delete-selected", AuthVerifyMiddleware, TasksController.deleteSelectedTask);
router.delete("/task/:id", AuthVerifyMiddleware, TasksController.deleteTask);
router.get("/task/update/:id/:status", AuthVerifyMiddleware, TasksController.updateTaskStatus);
router.get("/task/filter/:status", AuthVerifyMiddleware, TasksController.filterTaskByStatus);
router.get("/task/status-count", AuthVerifyMiddleware, TasksController.taskStatusCount);

router.get("/task-list/:pageNo/:perPage/:searchKey?", AuthVerifyMiddleware, TasksController.TaskList);


module.exports=router;