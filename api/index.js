require('dotenv').config();
const app=require('./app');
app.listen(process.env.APP_PORT,function () {
    console.log("Application Start")
})