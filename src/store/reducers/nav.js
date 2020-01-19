import * as types from "../types";
const initialState = {
    back: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.NAVIGATION:
      return {
        ...state,
        back: action.val
      }

    default:
      return {
        ...state
      }
  }
}
export default reducer;