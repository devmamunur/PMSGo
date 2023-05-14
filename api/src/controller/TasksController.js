const TasksModel = require("../models/TasksModel")


// Task Creat
exports.createTask = (req, res) => {
    let reqBody = req.body;
    reqBody.email = req.headers['email'];

    TasksModel.create(reqBody).then((document) => {
        res.status(200).json({success: true, data: document});
    }).catch((error) => {
        res.status(400).json({success: false, data: error});
    })
}

// Task Delete
exports.deleteTask = (req, res) => {
    const id = req.params.id
    const query = {_id: id}

    TasksModel.deleteOne(query).then((document) => {
        res.status(200).json({success: true, data: document});
    }).catch((error) => {
        res.status(400).json({success: false, data: error});
    })
}

// Task Status Update
exports.updateTaskStatus = (req, res) => {
    const id = req.params.id
    const status = req.params.status;
    const query = {_id: id}
    TasksModel.updateOne(query, {status}).then((document) => {
        res.status(200).json({success: true, data: document});
    }).catch((error) => {
        res.status(400).json({success: false, data: error});
    })
}

// Filter Task By Status
exports.filterTaskByStatus = (req, res) => {
    let status = req.params.status
    let email = req.headers['email']
    TasksModel.aggregate([{$match: {status: status, email: email}}, {
        $project: {
            _id: 1, title: 1, description: 1, status: 1, createdDate: {
                $dateToString: {
                    date: "$createdDate", format: "%d-%m-%Y"
                }
            }
        }
    }]).then((data) => {
        res.status(200).json({success: true, data: data});
    }).catch((error) => {
        res.status(400).json({success: false, data: error});
    })
}

// Task Status  Count
exports.taskStatusCount = (req, res) => {
    let email = req.headers['email']
    TasksModel.aggregate([
        {
            $match: {email: email}
        },
        {
            $group: {
                _id: "$status", sum: {$count: {}}
            }
        }
    ]).then((data) => {
        res.status(200).json({success: true, data: data});
    }).catch((error) => {
        res.status(400).json({success: false, data: error});
    })
}


exports.TaskList=async (req, res) => {
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let searchValue = req.params.searchKey;
    const skipRow = ((pageNo === 0 ? 1 : pageNo) - 1) * perPage;
    let Rows;
    let Total;
    if (searchValue) {
        let SearchRgx = {"$regex": searchValue, "$options": "i"}
        let SearchQuery = {$or: [{title: SearchRgx}]}


        Rows = await TasksModel.aggregate([{$match: SearchQuery}, {$skip: skipRow}, {$limit: perPage}])
        let countResult = await TasksModel.aggregate([{$match: SearchQuery}, {$count: "total"}]);
        Total = countResult.length > 0 ? countResult[0]['total'] : 0;

    } else {
        Total = (await TasksModel.aggregate([{$count: "total"}]))[0]['total']
        Rows = await TasksModel.aggregate([{$skip: skipRow}, {$limit: perPage}])
    }
    res.status(200).json({status: "success", total: Total, data: Rows})
}
