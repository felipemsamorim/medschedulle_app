import { config } from '../_constants';
import { authHeader } from '../_helpers';
const jwt = require('jsonwebtoken');

export const medsService = {
    create,
    update,
    getAll,
    getOne,
    getOneSession,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/meds`, requestOptions).then(handleResponse);
}

function getOne(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/meds/${id}`, requestOptions).then(handleResponse);
}

function getOneSession(data) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    var token = requestOptions.headers['x-access-token']
    jwt.verify(token, config.SECRET, function (err, decoded) {
        if (err)
        return  data(err)
        return fetch(`${config.apiUrl}/meds/${decoded.id}`, requestOptions)
            .then(m => data(m));
    });
}

function create(ma) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ma)
    };

    return fetch(`${config.apiUrl}/meds`, requestOptions).then(handleResponse);
}

function update(ma) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ma)
    };

    return fetch(`${config.apiUrl}/meds`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/meds/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}