import { medAvConstants } from '../_constants';

export function ma(state = {}, action) {
  switch (action.type) {
  

    case medAvConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case medAvConstants.GETALL_SUCCESS:
      return {
        items: action.ma
      };
    case medAvConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case medAvConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case medAvConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case medAvConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(ma => {
          if (ma.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...maCopy } = ma;
            // return copy of user with 'deleteError:[error]' property
            return { ...maCopy, deleteError: action.error };
          }

          return ma;
        })
      };
    default:
      return state
  }
}