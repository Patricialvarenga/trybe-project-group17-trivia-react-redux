import { FAIL_REQUEST, RECEIVE_TOKEN, REQUEST_TOKEN, GET_NAME_EMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  loading: false,
  error: null,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return ({
      ...state,
      loading: true,
    });
  case RECEIVE_TOKEN:
    return ({
      ...state,
      loading: false,
      token: action.payload,
    });
  case FAIL_REQUEST:
    return ({
      ...state,
      loading: false,
      error: action.payload,
    });
  case GET_NAME_EMAIL:
    return ({
      ...state,
      name: action.name,
      email: action.email,
    });
  default:
    return state;
  }
};

export default player;
