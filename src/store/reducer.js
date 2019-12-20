import * as actions from "./actions";
const initialState = {
  name: localStorage.getItem("name") || "",
  lastname: localStorage.getItem("lastname") || "",
  authenticated: localStorage.getItem("authenticated") || false,
  error: false,
  adverts: [],
  filters: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        name: action.val.name,
        lastname: action.val.lastname,
        authenticated: action.val.auth
      };

    case actions.LOGOUT:
      return {
        ...state,
        name: "",
        lastname: "",
        authenticated: false,
        back: false
      }

    case actions.NAVIGATION:
      return {
        ...state,
        back: action.val
      }

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