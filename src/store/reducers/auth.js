import * as types from "../types";
const initialState = {
  name: "",
  lastname: "",
  authenticated: false,
  
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        name: action.val.name,
        lastname: action.val.lastname,
        authenticated: action.val.auth
      };

    case types.LOGOUT:
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