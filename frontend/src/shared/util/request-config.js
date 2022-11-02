const BASE_URL       = 'http://localhost:5000/api';
const BASE_URL_USERS = BASE_URL + '/users';
const BASE_URL_CART  = BASE_URL + '/cart';

export const CONTENT_TYPE_JSON = { 'Content-Type': 'application/json' };

const GET  = { method: 'GET' };
const POST = { method: 'POST' };

export const VALIDATE_SESSION = {
    ...POST,
    BASE_URL
};

export const SIGNUP_USER = {
    ...POST,
    url: BASE_URL_USERS + '/signup'
};

export const LOGIN_USER = {
   ...POST,
   url: BASE_URL_USERS + '/login'
};

export const GET_USER_CART = (userId) => {
    return {
        ...POST,
        url: BASE_URL_CART + '/' + userId
    };
};

/* 
export const requestConfig = (url, data, newHeader, addHeader) => {
    let request = {
        ...url,
        headers: newHeader ? newHeader : { 'Content-Type': 'application/json' },
    }

    if(addHeader) request.headers = {...request.headers, addHeader};

    if(data)
        request = {
            ...request,
            data
        };
    
    return request;
}; */

