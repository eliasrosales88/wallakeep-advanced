import * as types from "../types";
const initialState = {
  error: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

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