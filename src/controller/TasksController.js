const TasksModel = require("../models/TasksModel")


// Task Creat
exports.createTask = (req, res) => {
    let reqBody = req.body;
    reqBody.email = req.headers['email'];

    TasksModel.create(reqBody).then((document) => {
        res.status(200).json({success : true, data : document});
    }).catch((error) => {
        res.status(400).json({success : false, data : error});
    })
}

// Task Delete
exports.deleteTask = (req, res) => {
    const id = req.params.id
    const query = {_id : id}

    TasksModel.deleteOne(query).then((document) => {
        res.status(200).json({success : true, data : document});
    }).catch((error) => {
        res.status(400).json({success : false, data : error});
    })
}

// Task Status Update
exports.updateTaskStatus = (req, res) => {
    const id = req.params.id
    const status = req.params.status;
    const query = {_id : id}
    TasksModel.updateOne(query, {status}).then((document) => {
        res.status(200).json({success : true, data : document});
    }).catch((error) => {
        res.status(400).json({success : false, data : error});
    })
}

