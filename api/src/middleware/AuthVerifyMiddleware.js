const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    let Token = req.headers["token"]
    jwt.verify(Token, "Secret123", function (err, decoded) {
        if (err) {
            res.status(400).json({success: false, data: err});
        } else {
            req.headers.email = decoded["data"];
            next()
        }
    })
}
