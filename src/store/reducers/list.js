import * as actions from "../actions";
const initialState = {
  adverts: [],
  filters: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actions.SET_ADVERTS:
      return {
        ...state,
        adverts: action.adverts
      };

    case actions.SET_TAG_FILTERS:
      return {
        ...state,
        filters: action.filters
      };

    case actions.SET_TYPE_FILTERS:
      return {
        ...state,
        filters: action.filters
      };

    case actions.SET_FILTERS:
      return {
        ...state,
        filters: action.filters
      };

    case actions.FETCH_ADVERTS_FAILED:
      return {
        ...state,
        error: true
      };

    default:
      return {
        ...state
      }
  }
}
export default reducer;