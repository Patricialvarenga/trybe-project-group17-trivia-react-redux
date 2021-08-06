export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
const receiveQuestions = (payload) => ({
  type: RECEIVE_QUESTIONS,
  payload,
});

export const FAIL_REQUEST_QUESTIONS = 'FAIL_REQUEST_QUESTIONS';
const failRequestQuestion = (payload) => ({
  type: FAIL_REQUEST_QUESTIONS,
  payload,
});

export const UPDATE_SCORE = 'UPDATE_SCORE';
const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

export const fetchQuestions = (token) => async (dispatch) => {
  const QUESTIONS_URL = `https://opentdb.com/api.php?amount=5&encode=base64&token=${token}`;
  try {
    dispatch(requestQuestions());
    const questionsRequest = await fetch(QUESTIONS_URL);
    const questionsJSON = await questionsRequest.json();
    dispatch(receiveQuestions(questionsJSON.results));
  } catch (e) {
    dispatch(failRequestQuestion(e));
  }
};

export const INCREASE_ASSERTIONS = 'INCREASE_ASSERTIONS';
export const increaseAssertions = () => ({
  type: INCREASE_ASSERTIONS,
});

export const setNewScore = (score) => (dispatch) => {
  dispatch(updateScore(score));
  dispatch(increaseAssertions());
  const storageState = localStorage.getItem('state');
  const objState = JSON.parse(storageState);
  const newState = {
    ...objState.player,
    score: objState.player.score + score,
    assertions: objState.player.assertions + 1,
  };
  localStorage.setItem('state', JSON.stringify({ player: newState }));
};
