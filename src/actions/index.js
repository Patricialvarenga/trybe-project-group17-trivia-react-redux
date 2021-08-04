export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const receiveToken = (payload) => ({
  type: RECEIVE_TOKEN,
  payload,
});

export const FAIL_REQUEST = 'FAIL_REQUEST';
export const failRequest = (payload) => ({
  type: FAIL_REQUEST,
  payload,
});

export const GET_NAME_EMAIL = 'GET_NAME_EMAIL';
export const getNameAndEmail = (name, email) => ({
  type: GET_NAME_EMAIL,
  name,
  email,
});

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const receiveQuestions = (payload) => ({
  type: RECEIVE_QUESTIONS,
  payload,
});

export const FAIL_REQUEST_QUESTIONS = 'FAIL_REQUEST_QUESTIONS';
export const failRequestQuestion = (payload) => ({
  type: FAIL_REQUEST_QUESTIONS,
  payload,
});

export const getToken = () => async (dispatch) => {
  dispatch(requestToken());
  const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
  try {
    const tokenRequest = await fetch(TOKEN_URL);
    const tokenJSON = await tokenRequest.json();
    dispatch(receiveToken(tokenJSON.token));
    localStorage.setItem('token', tokenJSON.token);
    const QUESTIONS_URL = `https://opentdb.com/api.php?amount=5&token=${tokenJSON.token}`;
    try {
      const questionsRequest = await fetch(QUESTIONS_URL);
      const questionsJSON = await questionsRequest.json();
      dispatch(receiveQuestions(questionsJSON.results));
    } catch (e) {
      dispatch(failRequestQuestion(e));
    }
  } catch (e) {
    dispatch(failRequest(e));
  }
};
