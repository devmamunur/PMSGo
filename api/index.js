const app=require('./app');

app.get("/", (req, res) => {
    res.send("Hello New World Jony vai")
});

app.listen(8000,function () {
    console.log("Application Start")
})