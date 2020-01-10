import reducer from "./nav";
import * as Actions from "../actions";

describe('nav reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            back: false
        });
    });
   
})