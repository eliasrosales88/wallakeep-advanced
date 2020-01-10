import * as actions from "../actions";
const initialState = {
  error: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

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