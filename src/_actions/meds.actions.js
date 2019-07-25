import { medsConstants } from '../_constants';
import { medsService } from '../_services';
import { alertActions } from '.';

export const medsActions = {
    create,
    update,
    getAll,
    getOne,
    getOneSession,
    delete: _delete
};
const formattedDate = (d) => {
    d = d.split('/')
    return `${d[2]}-${d[1]}-${d[0]}`;
}
function create(m) {
    return dispatch => {
        dispatch(request(m));

        medsService.create(m)
            .then(
                m => {
                    dispatch(success());
                    dispatch(alertActions.success('med created'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(m) { return { type: medsConstants.CREATE_REQUEST, ma } }
    function success(m) { return { type: medsConstants.CREATE_SUCCESS, ma } }
    function failure(error) { return { type: medsConstants.CREATE_FAILURE, error } }
}
function update(ma) {
    return dispatch => {
        dispatch(request(m));

        medsService.update(m)
            .then(
                m => {
                    dispatch(success(m));
                    dispatch(alertActions.success('disponibility updated'));
                    dispatch(getAll())
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(m) { return { type: medsConstants.UPDATE_REQUEST, m } }
    function success(m) { return { type: medsConstants.UPDATE_SUCCESS, m } }
    function failure(error) { return { type: medsConstants.UPDATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        medsService.getAll()
            .then(
                m => dispatch(success(m)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: medsConstants.GETALL_REQUEST } }
    function success(m) { return { type: medsConstants.GETALL_SUCCESS, m } }
    function failure(error) { return { type: medsConstants.GETALL_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());

        medsService.getOne(id)
            .then(
                m => dispatch(success(m)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: medsConstants.GETONE_REQUEST } }
    function success(m) { return { type: medsConstants.GETONE_SUCCESS, m } }
    function failure(error) { return { type: medsConstants.GETONE_FAILURE, error } }
}
function getOneSession() {
    return dispatch => {
        dispatch(request());

        medsService.getOneSession(data => {
            if(data.name == 'TokenExpiredError'){
                dispatch(failure(data.toString()))
            }else{
                dispatch(success(data))
            }
        })
    };

    function request() { return { type: medsConstants.GETONESESSION_REQUEST } }
    function success(m) { return { type: medsConstants.GETONESESSION_SUCCESS, m } }
    function failure(error) { return { type: medsConstants.GETONESESSION_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        medsService.delete(id)
            .then(
                m => dispatch(success(m)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: medsConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: medsConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: medsConstants.DELETE_FAILURE, id, error } }
}