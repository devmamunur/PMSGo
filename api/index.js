const app=require('./app');

app.get("/", (req, res) => {
    res.send("Hello Mamun 2")
});

app.listen(8000,function () {
    console.log("Application Start")
})