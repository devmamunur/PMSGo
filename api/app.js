const express = require('express');
const router = require('./src/route/api');
const app = new express();

//Body Parser Implementation
bodyParser = require('body-parser');
app.use(bodyParser.json())

//Security Middleware
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

//Database
const mongoose = require('mongoose');
const path = require("path");

//Security Middleware Implement
app.use(cors());
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())


//Rate Limiter
const limiter = rateLimit({windowMs: 15 * 60 * 100, max: 3000})

//Database
let URI = "mongodb://127.0.0.1:27017/task_manager";
let OPTION = {user: '', pass: '', autoIndex: true};
mongoose.connect(URI, OPTION).then((res) => {
    console.log("Database Connection Successfully!");
}).catch((err) => {
    console.log("Database Connection Failed!");
})


// Managing BackEnd API Routing
app.use("/api/v1", router)


module.exports = app;