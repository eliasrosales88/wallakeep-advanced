import * as types from "../types";
const initialState = {
  tagsList:[]
  
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TAGS:
      return {
        ...state,
        tagsList: action.tags,
      };

    default:
      return {
        ...state
      }
  }
}
export default reducer;