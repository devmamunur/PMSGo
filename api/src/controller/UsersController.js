const UsersModel = require("../models/UsersModel")
const jwt = require("jsonwebtoken")

// Registration
exports.registration=(req, res) => {

    const reqBody = req.body
    UsersModel.create(reqBody).then((document) => {
        res.status(200).json({success : true, data : document});
    }).catch((error) => {
        res.status(200).json({success : false, data : error});
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
    const email = req.headers["email"];
    const reqBody = {};
    if (req.body.email) {
        reqBody.email = req.body.email;
    }
    if (req.body.firstName) {
        reqBody.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
        reqBody.lastName = req.body.lastName;
    }
    if (req.body.mobile) {
        reqBody.mobile = req.body.mobile;
    }
    if (req.body.password) {
        reqBody.password = req.body.password;
    }else {
        delete reqBody.password;
    }

    if (req.body.photo) {
        reqBody.photo = req.body.photo;
    }else {
        delete reqBody.photo;
    }


    UsersModel.updateOne({email : email}, reqBody).then((document) => {
        res.status(200).json({success : true, data : document});
    }).catch((error) => {
        res.status(400).json({success : false, data : error});
    })
}

exports.profileDetails=(req, res) => {
    const email = req.headers["email"];
    UsersModel.aggregate([
        {$match:{email:email}},
        {$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}
    ]).then((document) => {
        res.status(200).json({success : true, data : document});
    }).catch((error) => {
        res.status(400).json({success : false, data : error});
    })
}