const UsersModel = require("../models/UsersModel")
const jwt = require("jsonwebtoken")

// Registration
exports.registration=(req, res) => {

    const reqBody = req.body
    UsersModel.create(reqBody).then((document) => {
        res.status(200).json({success : true, data : document});
    }).catch((error) => {
        res.status(400).json({success : false, data : error});
    })
}

// Login
exports.login = (req, res) => {
    const reqBody = req.body;
    UsersModel.aggregate([
        { $match: reqBody },
        {
            $project: {
                _id: 0,
                email: 1,
                firstName: 1,
                lastName: 1,
                mobile: 1,
                photo: 1,
            },
        },
    ]).then((data) => {
        if(data.length > 0){
            let Payload = { exp : Math.floor(Date.now() / 1000) + (24*60*60), data : data[0]['email']};
            let token = jwt.sign(Payload, 'Secret123');
            res.status(200).json({success : true, token : token, data : data[0]});
        }else {
            res.status(401).json({success : false, data : "Unauthorized"});
        }
    }).catch((error)=> {
        res.status(400).json({success : false, data : error});
    });
}

// Profile Update
exports.profileUpdate=(req, res) => {
    const reqBody = req.body
    const email = req.headers["email"]

    UsersModel.updateOne({email : email}, reqBody).then((document) => {
        res.status(200).json({success : true, data : document});
    }).catch((error) => {
        res.status(400).json({success : false, data : error});
    })
}