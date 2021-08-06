// import { UPDATE_SCORE } from '../actions';
import {
  UPDATE_SCORE, FAIL_REQUEST_QUESTIONS, RECEIVE_QUESTIONS, REQUEST_QUESTIONS,
} from '../actions';

const INITIAL_STATE = {
  results: [],
  assertions: '',
  score: 0,
  loading: false,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      loading: true,
    };
  case FAIL_REQUEST_QUESTIONS:
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  case RECEIVE_QUESTIONS:
    return {
      ...state,
      results: action.payload,
      loading: false,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default game;
