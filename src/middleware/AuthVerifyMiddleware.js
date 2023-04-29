const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    let Token = req.headers["token"]
    jwt.verify(Token, "Secret123")
        .then((data) => {
            req.headers.email = data["data"];
            next()
        })
        .catch((error) => {
            res.status(400).json({success: false, data: error});
        })
}