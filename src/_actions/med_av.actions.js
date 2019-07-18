import { medAvConstants } from '../_constants';
import { medAvService } from '../_services';
import { alertActions } from '.';

export const medAvActions = {
    create,
    update,
    getAll,
    delete: _delete
};
const formattedDate = (d) =>{
    console.log(d)
    d =  new Date(d)
   let month = String(d.getMonth() + 1);
   let day = String(d.getDate() + 1);
   const year = String(d.getFullYear());
 
   if (month.length < 2) month = '0' + month;
   if (day.length < 2) day = '0' + day;
 
   return `${year}-${month}-${day}`;
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
                    dispatch(success());
                    dispatch(alertActions.success('disponibility updated'));
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