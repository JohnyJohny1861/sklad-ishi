import axios from 'axios';
import { stringify } from 'query-string';

// export const baseURL = 'http://192.168.1.110:8000/';
// export const baseURL = 'http://localhost:8000/';
export const baseURL = 'https://jasurbek.herokuapp.com/';

const instance = axios.create({
    baseURL
});

export default instance;

export const HTTP = async(source, filter={}) => {
    const query = { filter: JSON.stringify(filter) };
    const url = `${source}?${stringify(query)}`;
    try {
        const res = await instance(url, {
            headers : {
                Accept: 'application/json',
                'Content-type': 'application/json'
            }
        });
        return Promise.resolve(res.data.data);
    } catch(err) {
        return Promise.reject(err)
    }
}