import Swal from "sweetalert2";
import TaskRequest from "@/APIRequests/task.request";

class DeleteHelper {
    static deleteToDO(id : string){
        return  Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                return  TaskRequest.deleteTask(id).then((res : any)=>{
                    return res
                })
            }
        })
    }
    static deleteSelectedTaskAlert(ids : any){
        return  Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                return  TaskRequest.deleteSelectedTask(ids).then((res : any)=>{
                    return res
                })
            }
        })
    }
}

export default DeleteHelper;
