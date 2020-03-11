/*
*
* HomePage reducer
*
*/
import { fromJS } from 'immutable';

const initialState = fromJS({});


const homePageReducer = (state, action) => {
  switch(action.type) {
    default:
      return state;
    }
}

export default homePageReducer;
export { initialState };