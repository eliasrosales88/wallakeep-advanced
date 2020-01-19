import * as types from "./types";
const initialState = {
  adverts: [],
  filters: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.SET_ADVERTS:
      return {
        ...state,
        adverts: action.adverts
      };

    case types.SET_TAG_FILTERS:
      return {
        ...state,
        filters: action.filters
      };

    case types.SET_TYPE_FILTERS:
      return {
        ...state,
        filters: action.filters
      };

    case types.SET_FILTERS:
      return {
        ...state,
        filters: action.filters
      };

    case types.FETCH_ADVERTS_FAILED:
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