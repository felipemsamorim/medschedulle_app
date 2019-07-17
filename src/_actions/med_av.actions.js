import { medAvConstants } from '../_constants';
import { medAvService } from '../_services';
import { alertActions } from '.';

export const medAvActions = {
    create,
    getAll,
    delete: _delete
};

function create(ma) {
    return dispatch => {
        dispatch(request(ma));

        medAvService.create(ma)
            .then(
                ma => { 
                    dispatch(success());
                    dispatch(alertActions.success('disponibility created'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(ma) { return { type: medAvConstants.REGISTER_REQUEST, ma } }
    function success(ma) { return { type: medAvConstants.REGISTER_SUCCESS, ma } }
    function failure(error) { return { type: medAvConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        medAvService.getAll()
            .then(
                ma => dispatch(success(ma)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: medAvConstants.GETALL_REQUEST } }
    function success(ma) { return { type: medAvConstants.GETALL_SUCCESS, ma } }
    function failure(error) { return { type: medAvConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        medAvService.delete(id)
            .then(
                ma => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: medAvConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: medAvConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: medAvConstants.DELETE_FAILURE, id, error } }
}