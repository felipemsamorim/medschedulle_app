import { medsConstants } from '../_constants';

export function meds(state = {}, action) {
  switch (action.type) {

    case medsConstants.UPDATE_REQUEST:
      return { updating: true };
    case medsConstants.UPDATE_SUCCESS:
      return action.meds;
    case medsConstants.UPDATE_FAILURE:
      return {
        error: action.error
      };

    case medsConstants.GETONE_REQUEST:
      return {
        loading: true
      };
    case medsConstants.GETONE_SUCCESS:
      return action.m
    case medsConstants.GETONE_FAILURE:
      return {
        error: action.error
      };

    case medsConstants.GETONESESSION_REQUEST:
      return {
        loading: true
      };
    case medsConstants.GETONESESSION_SUCCESS:
      return action.m
    case medsConstants.GETONESESSION_FAILURE:
      return {
        error: action.error
      };

    case medsConstants.DELETE_REQUEST:
      // add 'deleting:true' property to meds being deleted
      return {
        ...state,
        items: state.items.medsp(meds =>
          meds.id === action.id
            ? { ...meds, deleting: true }
            : meds
        )
      };
    case medsConstants.DELETE_SUCCESS:
      // remove deleted meds from state
      return {
        items: state.items.filter(meds => meds.id !== action.id)
      };
    case medsConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to meds 
      return {
        ...state,
        items: state.items.medsp(meds => {
          if (meds.id === action.id) {
            // medske copy of meds without 'deleting:true' property
            const { deleting, ...medsCopy } = meds;
            // return copy of meds with 'deleteError:[error]' property
            return { ...medsCopy, deleteError: action.error };
          }

          return meds;
        })
      };
    default:
      return state
  }
}