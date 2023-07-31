import axios from '@/services/axios';
import ToastHelper from '@/helpers/toast.helper';
import store from '@/redux/store/store';
import {setProject} from '@/redux/state-slice/ProjectSlice';
import {ProjectCreateInterface} from '@/interfaces/project/project.interface';

class ProjectsService {
    async create(body: ProjectCreateInterface) {
        return await axios
            .post('/projects', body)
            .then(res => {
                ToastHelper.successToast(res.data.message);
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
                store.dispatch(setProject(res.data.data));
                return true;
            })
            .catch(err => {
                ToastHelper.errorToast(err.response.data.error);
                return false;
            });
    }
}

export const projectsService: ProjectsService = new ProjectsService();
