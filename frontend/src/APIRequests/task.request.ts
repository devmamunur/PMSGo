import store from "@/redux/store/store";
import {hideLoader, showLoader} from "@/redux/state-slice/SettingsSlice";
import axios from "axios";
import {
    setAllTask,
    setCanceledTask,
    setCompletedTask,
    setNewTask,
    setProgressTask, setTotal
} from "@/redux/state-slice/TaskSlice";
import ToastHelper from "@/helpers/toast.helper";
import {setSummary} from "@/redux/state-slice/SummarySlice";


const baseURL = process.env.NEXT_PUBLIC_API_URL;

class TaskRequest {
    static newTask(title: string, description: string, status: string = 'new') {
        store.dispatch(showLoader);
        let URL = baseURL + "/task";
        let postBody = {title, description, status};

        return axios.post(URL, postBody).then((res) => {
            store.dispatch(hideLoader);
            if (res.status === 200) {
                ToastHelper.successToast("New Task Created")
                return true
            } else {
                ToastHelper.errorToast("Something Went Wrong!")
                return false;
            }
        }).catch((err) => {
            store.dispatch(hideLoader);
            ToastHelper.errorToast("Something Went Wrong!");
            return false
        })
    }
    static taskListByStatus(status: string) {
        store.dispatch(showLoader())
        let URL = baseURL + "/task/filter/" + status;
        axios.get(URL).then((res) => {
            store.dispatch(hideLoader())
            if (res.status === 200) {
                if (status === "New") {
                    store.dispatch(setNewTask(res.data['data']))
                } else if (status === "Completed") {
                    store.dispatch(setCompletedTask(res.data['data']))
                } else if (status === "Canceled") {
                    store.dispatch(setCanceledTask(res.data['data']))
                } else if (status === "Progress") {
                    store.dispatch(setProgressTask(res.data['data']))
                }
            } else {
                ToastHelper.errorToast("Something Went Wrong")
            }
        }).catch((err) => {
            ToastHelper.errorToast("Something Went Wrong")
            store.dispatch(hideLoader())
        });
    }
    static summaryRequest() {
        store.dispatch(showLoader())
        let URL = baseURL + "/task/status-count";
        axios.get(URL).then((res) => {
            store.dispatch(hideLoader())
            if (res.status === 200) {
                store.dispatch(setSummary(res.data['data']))
            } else {
                ToastHelper.errorToast("Something Went Wrong")
            }
        }).catch((err) => {
            ToastHelper.errorToast("Something Went Wrong")
            store.dispatch(hideLoader())
        });
    }
    static deleteTask(id: string) {
        store.dispatch(showLoader())
        let URL = baseURL + "/task/" + id;
        return axios.delete(URL).then((res) => {
            store.dispatch(hideLoader())
            if (res.status === 200) {
                ToastHelper.successToast("Delete Successful")
                return true;
            } else {
                ToastHelper.errorToast("Something Went Wrong")
                return false;
            }
        }).catch((err) => {
            ToastHelper.errorToast("Something Went Wrong")
            store.dispatch(hideLoader())
            return false;
        });
    }
    static updateStatus(id: string, status: string) {
        store.dispatch(showLoader())
        let URL = baseURL + "/task/update/" + id + "/" + status;
        return axios.get(URL).then((res) => {
            store.dispatch(hideLoader())
            if (res.status === 200) {
                ToastHelper.successToast("Status Updated")
                return true;
            } else {
                ToastHelper.errorToast("Something Went Wrong")
                return false;
            }
        }).catch((err) => {
            ToastHelper.errorToast("Something Went Wrong")
            store.dispatch(hideLoader())
            return false;
        });
    }
    static getTaskList(pageNo: number, perPage: number, searchKey: string) {
        store.dispatch(showLoader());
        let URL = baseURL + "/task-list/" + pageNo + "/" + perPage + "/" + searchKey;
        return axios.get(URL).then((res) => {
            store.dispatch(hideLoader())
            if (res.status === 200) {
                store.dispatch(setAllTask(res.data['data']))
                store.dispatch(setTotal(res.data['total']))
                return true;
            }
        }).catch((err) => {
            ToastHelper.errorToast("Something Went Wrong")
            store.dispatch(hideLoader())
            return false;
        });
    }
    static deleteSelectedTask(ids: string) {
        store.dispatch(showLoader())
        let URL = baseURL + "/task/delete-selected";
        let postBody = {ids};
        return axios.post(URL, postBody).then((res) => {
            store.dispatch(hideLoader())
            if (res.status === 200) {
                ToastHelper.successToast("Delete Successful")
                return true;
            } else {
                ToastHelper.errorToast("Something Went Wrong")
                return false;
            }
        }).catch((err) => {
            ToastHelper.errorToast("Something Went Wrong")
            store.dispatch(hideLoader())
            return false;
        });
    }
}
export default TaskRequest;