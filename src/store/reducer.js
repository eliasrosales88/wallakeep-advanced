import * as actionTypes from "./actions";
const initialState = {
  name: localStorage.getItem("name") || "",
  lastname: localStorage.getItem("lastname") || "",
  authenticated: localStorage.getItem("authenticated") || false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAFE_USER_INFO:
      return {
        ...state,
        name: action.val.name,
        lastname: action.val.lastname,
        authenticated: action.val.auth
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        name: "",
        lastname: "",
        authenticated: false,
      }

    default:
      return {
        ...state
      }
  }
}
export default reducer;