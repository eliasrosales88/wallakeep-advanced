import * as types from '../types';

import Session from '../../models/Session';

const defaultState = {
  session: new Session(),
};

const reducer = (state = defaultState.session, action) => {
  switch (action.type) {
    case types.SESSION_SAVE:
      return { ...state, ...action.session };

    case types.SESSION_CLEAR:
      return defaultState.session;

    default:
      return state;
  }
};

export default reducer;