import { medAvConstants } from '../_constants';
import { medAvService } from '../_services';
import { alertActions } from '.';

export const medAvActions = {
    create,
    update,
    getAll,
    delete: _delete
};
const formattedDate = (d) => {
    d = d.split('/')
    return `${d[2]}-${d[1]}-${d[0]}`;
}
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

    function request(ma) { return { type: medAvConstants.CREATE_REQUEST, ma } }
    function success(ma) { return { type: medAvConstants.CREATE_SUCCESS, ma } }
    function failure(error) { return { type: medAvConstants.CREATE_FAILURE, error } }
}
function update(ma) {
    ma.start = formattedDate(ma.start)
    ma.end = formattedDate(ma.end)
    return dispatch => {
        dispatch(request(ma));

        medAvService.update(ma)
            .then(
                ma => {
                    dispatch(success(ma));
                    dispatch(alertActions.success('disponibility updated'));
                    dispatch(getAll())
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(ma) { return { type: medAvConstants.UPDATE_REQUEST, ma } }
    function success(ma) { return { type: medAvConstants.UPDATE_SUCCESS, ma } }
    function failure(error) { return { type: medAvConstants.UPDATE_FAILURE, error } }
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