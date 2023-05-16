import TasksModel from '../models/task.model';

class TaskRepository {
    static createTask(data : any) {
        return TasksModel.create(data);
    }

    static deleteTask(id : any) {
        const query = { _id: id };
        return TasksModel.deleteOne(query);
    }

    static updateTaskStatus(id : any, status : any) {
        const query = { _id: id };
        return TasksModel.updateOne(query, { status });
    }

    static filterTaskByStatus(status : any, userId : any) {
        return TasksModel.aggregate([
            { $match: { status : status, userId : userId } },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    status: 1,
                    createdDate: {
                        $dateToString: {
                            date: '$createdDate',
                            format: '%d-%m-%Y',
                        },
                    },
                },
            },
        ]);
    }

    static taskStatusCount(userId : string) {
        return TasksModel.aggregate([
            {
                $match: { userId : userId },
            },
            {
                $group: {
                    _id: '$status',
                    sum: { $count: {} },
                },
            },
        ]);
    }

    static async taskList(pageNo : any, perPage : any, searchValue : any) {
        const skipRow = ((pageNo === 0 ? 1 : pageNo) - 1) * perPage;

        let rows;
        let total;

        if (searchValue) {
            const searchRgx = { $regex: searchValue, $options: 'i' };
            const searchQuery = { $or: [{ title: searchRgx }] };

            try {
                rows = await TasksModel.aggregate([
                    { $match: searchQuery },
                    { $skip: skipRow },
                    { $limit: perPage },
                ]);

                const countResult = await TasksModel.aggregate([
                    { $match: searchQuery },
                    { $count: 'total' },
                ]);

                total = countResult.length > 0 ? countResult[0]['total'] : 0;
            } catch (error) {
                throw error;
            }
        } else {
            try {
                const countResult = await TasksModel.aggregate([{ $count: 'total' }]);
                total = countResult.length > 0 ? countResult[0]['total'] : 0;
                rows = await TasksModel.aggregate([{ $skip: skipRow }, { $limit: perPage }]);
            } catch (error) {
                throw error;
            }
        }

        return { rows, total };
    }

    static deleteSelectedTask(ids : any) {
        return TasksModel.deleteMany({ _id: { $in: ids } });
    }
}

export default TaskRepository;
