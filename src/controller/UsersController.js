const UsersModel = require("../models/UsersModel")

// Registration
exports.registration=(req, res) => {
    const reqBody = req.body
    UsersModel.create(reqBody).then((document) => {
        res.status(200).json({success : true, data : document});
    }).catch((error) => {
        res.status(400).json({success : false, data : error});
    })
}