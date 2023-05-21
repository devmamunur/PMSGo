import Swal from "sweetalert2";
import {DeleteRequest, deleteSelectedTask} from "../APIRequest/APIRequest";

export function DeleteToDO(id){
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
            return  DeleteRequest(id).then((deleteResult)=>{
                return deleteResult
            })
        }
    })
}

export function deleteSelectedTaskAlert(ids){
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
            return  deleteSelectedTask(ids).then((deleteResult)=>{
                return deleteResult
            })
        }
    })
}