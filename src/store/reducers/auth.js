import * as actions from "../actions";
const initialState = {
  name: localStorage.getItem("name") || "",
  lastname: localStorage.getItem("lastname") || "",
  authenticated: localStorage.getItem("authenticated") || false,
  
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
      }


    default:
      return {
        ...state
      }
  }
}
export default reducer;