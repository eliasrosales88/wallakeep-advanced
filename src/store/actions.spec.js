import * as Actions from "./actions";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('actions', () => {
  describe('setTagFilters', () => {
    it('should create a SET_TAG_FILTER action', () => {
      const tags = ['lifestyle'];
      const expectedAction = {
        type: Actions.SET_TAG_FILTERS,
        filters: {
          tags
        } 
      };
      expect(Actions.setTagFilters(tags)).toEqual(expectedAction);
    })
  })
})