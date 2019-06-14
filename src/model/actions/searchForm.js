import { SUBMIT_FORM } from '../constants';
import history from '../../history';

export const submitForm = form => dispatch => {
  dispatch({ type: SUBMIT_FORM, payload: form });
  history.push('/results');
}