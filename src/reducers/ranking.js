import { NEW_RANK } from '../actions';

const INITIAL_STATE = {
  playerName: '', score: 0, picture: '',
};

const ranking = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_RANK:
    return {
      ...state,
      playerName: action.name,
      score: action.score,
      picture: action.picture,
    };
  default:
    return state;
  }
};

export default ranking;
