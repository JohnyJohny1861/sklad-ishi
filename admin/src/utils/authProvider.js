import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';
import axios from '../axios';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = {
            url: 'admin/login',
            method: 'POST',
            data: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        }
        return axios(request)
            .then((res) => {
                if (res.status === 226) {
                    throw new Error(res.data.error);
                }
                localStorage.setItem('token', res.data.token);
            });
    }

    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }

    if (type === AUTH_ERROR) {
        const status  = params.status;
        if (status === 226) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }

    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }
    return Promise.resolve();
}