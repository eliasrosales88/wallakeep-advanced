import * as actions from "../actions";
const initialState = {
    back: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actions.NAVIGATION:
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