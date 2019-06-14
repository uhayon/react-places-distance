import { SUBMIT_FORM } from '../constants'

const initialState = { errorState: false };

export default(state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_FORM:
      return { ...state, ...action.payload, validData: true };
    default:
      return state;
  }
}