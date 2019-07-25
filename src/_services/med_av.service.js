import { config } from '../_constants';
import { authHeader } from '../_helpers';

export const medAvService = {
    create,
    update,
    getAll,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/meds_availabilities`, requestOptions).then(handleResponse);
}

function create(ma) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ma)
    };

    return fetch(`${config.apiUrl}/meds_availabilities`, requestOptions).then(handleResponse);
}

function update(ma) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ma)
    };

    return fetch(`${config.apiUrl}/meds_availabilities`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/meds_availabilities/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}