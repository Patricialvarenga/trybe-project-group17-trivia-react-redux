import { FAIL_REQUEST, RECEIVE_TOKEN, REQUEST_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: undefined,
  score: undefined,
  gravatarEmail: undefined,
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
  default:
    return state;
  }
};

export default player;
