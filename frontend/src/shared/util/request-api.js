const BASE_URL       = 'http://localhost:5000/api';
const BASE_URL_USERS = BASE_URL + '/users';
const BASE_URL_CART  = BASE_URL + '/cart';
const BASE_URL_ITEMS = BASE_URL + '/items';

const AUTHORIZATION_BEARER = (token) => {
    return {'Authorization': `Bearer ${token}`};
};

const CONTENT_TYPE_JSON = { 'Content-Type': 'application/json' };

const GET  = { method: 'GET' };
const POST = { method: 'POST' };



//AUTH

export const API_SignupUser = (authData) => {

    return {
        ...POST,
        url: BASE_URL_USERS + '/signup',
        ...CONTENT_TYPE_JSON,
        authData
    };
};

export const API_LoginUser = (authData) => {
    return {
        ...POST,
        url: BASE_URL_USERS + '/login',
        ...CONTENT_TYPE_JSON,
        authData
    };
};

//CART

export const API_GetUserCart = (userId, token) => {
    return {
        ...GET,
        url: BASE_URL_CART + '/' /* + userId */,
        headers: {
            ...CONTENT_TYPE_JSON,
            ...AUTHORIZATION_BEARER(token)
        }
    };
};

