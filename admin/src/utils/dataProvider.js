// in myRestProvider.js
import axios from '../axios';
import { stringify } from 'query-string';
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    DELETE,
    DELETE_MANY,
    GET_MANY,
    GET_MANY_REFERENCE,
} from 'react-admin';

export default (type, resource, params) => {
    let url = '';
    const options = {
        headers : {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: window.localStorage.getItem('token')
        },
    };

    switch (type) {
        case GET_LIST: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([
                    (page - 1) * perPage,
                    page * perPage - 1,
                ]),
                filter: JSON.stringify(params.filter),
            };
            url = `${resource}?${stringify(query)}`;
            break;
        }
        case GET_ONE: {
            url = `${resource}/${params.id}`;
            break;
        }
        case GET_MANY: {
            const query = {
                filter: JSON.stringify({ ids: params.ids }),
            };
            url = `${resource}?${stringify(query)}`;
            break;
        }
        case CREATE: {
            url = `${resource}`;
            options.method = 'POST';
            if(params.data.products && resource === 'output') {
                params.data.products.forEach(el => {
                    // if product has a type get product's name
                    if(el.product.includes('--')) { el.name = el.product.split(' --')[0] } 
                    // if product has no type
                    else { el.name = el.product.split(' [')[0] }
                    const price = el.product.split("[ ")[1].split(" so'm")[0];
                    el.price = +price.split(',').join('');
                    delete el.product;

                    if(!params.data.debtPrice) {
                        const debtPrice = document.querySelector('[name="debtPrice"]');
                        if(debtPrice.value !== ''){ params.data.debtPrice = +debtPrice.value; }
                    }
                    if(!params.data.paidPrice) {
                        const paidPrice = document.querySelector('[name="paidPrice"]');
                        if(paidPrice.value !== ''){ params.data.paidPrice = +paidPrice.value; }
                    }
                })
            } 
            options.data = JSON.stringify(params.data)
            break;
        }
        case UPDATE: {
            options.method = 'PUT';
            url = `${resource}/${params.id}`;
            options.data = JSON.stringify(params.data);
            break;
        }
        case DELETE: { 
            url = `${resource}/${params.id}`;
            options.method = 'DELETE';
            break;
        }
        case DELETE_MANY: {
            const query = {
                filter: JSON.stringify({ id: params.ids }),
            };
            url = `${resource}?${stringify(query)}`;
            options.method = 'DELETE';
            break;
        }
        default:
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }

    return axios(url, options)
        .then(json => {
            let data = json.data.data;
            let total = json.data.total;
            switch (type) {
                case GET_ONE: {
                    return { data };
                }
                case GET_MANY: {
                    return { 
                        data: data,
                        ids: data.map(d => d.id) 
                    }
                }
                case GET_LIST:
                case GET_MANY_REFERENCE: 
                    return {
                        data: data,
                        total
                    };
                case CREATE:
                    return { data: { ...params.data } };
                case UPDATE:
                    return { data: { ...params.data } };
                case DELETE:
                        return { data: { ...params.data } };
                case DELETE_MANY:
                    return { data: data || [] };
                default:
                    return { data: data };
            }
        })
        .catch(err => console.log(err));
};