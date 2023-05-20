import { AxiosResponse } from 'axios';
import { api } from './api';

export const getTasks = (id?: number): Promise<AxiosResponse> => {
    const filter = `?id=${id}`;

    if (id) {
        return api.get(`/tasks${filter}`, {
            headers: {
                Authorization: process.env.REACT_APP_API_KEY,
            },
        });
    }
    return api.get('/tasks', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
    });
};

export const setTasks = (title: string, completed: boolean): Promise<AxiosResponse> => {
    return api.get('/tasks', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            title,
            completed
        }
    });
};

export const updateTask = (id:number | string, title: string, completed: boolean): Promise<AxiosResponse> => {
    return api.get( `/tasks/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            title,
            completed
        }
    });
};

export const deleteTask = (id:number | string): Promise<AxiosResponse> => {
    return api.get( `/tasks/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
    });
};



