import axios from '@/services/axios';
import ToastHelper from '@/helpers/toast.helper';
import store from '@/redux/store/store';
import {setProjects, setSingleProject} from '@/redux/state-slice/ProjectSlice';
import {ProjectCreateInterface, ProjectUpdateInterface} from '@/interfaces/project/project.interface';

class ProjectsService {
    async create(body: ProjectCreateInterface) {
        return await axios
            .post('/projects', body)
            .then(res => {
                ToastHelper.successToast(res.data.message);
                this.get();
                return true;
            })
            .catch(err => {
                ToastHelper.errorToast(err.response.data.error);
                return false;
            });
    }

    async get() {
        return await axios
            .get('/projects')
            .then(res => {
                store.dispatch(setProjects(res.data.data));
                return true;
            })
            .catch(err => {
                ToastHelper.errorToast(err.response.data.error);
                return false;
            });
    }

    async getSingle(id : string) {
        return await axios
            .get('/projects/'+id)
            .then(res => {
                store.dispatch(setSingleProject(res.data.data));
                return true;
            })
            .catch(err => {
                ToastHelper.errorToast(err.response.data.error);
                return false;
            });
    }

    async update(body: ProjectUpdateInterface, id : string) {
        return await axios
            .put('/projects/'+id, body)
            .then(res => {
                ToastHelper.successToast(res.data.message);
                this.get();
                return true;
            })
            .catch(err => {
                ToastHelper.errorToast(err.response.data.error);
                return false;
            });
    }
}

export const projectsService: ProjectsService = new ProjectsService();
