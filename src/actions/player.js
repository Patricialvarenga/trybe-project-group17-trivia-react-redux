export const REQUEST_TOKEN = 'REQUEST_TOKEN';
const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
const receiveToken = (payload) => ({
  type: RECEIVE_TOKEN,
  payload,
});

export const FAIL_REQUEST = 'FAIL_REQUEST';
const failRequest = (payload) => ({
  type: FAIL_REQUEST,
  payload,
});

export const GET_NAME_EMAIL = 'GET_NAME_EMAIL';
const getNameAndEmail = (name, email) => ({
  type: GET_NAME_EMAIL,
  name,
  email,
});

export const setNameAndEmail = (name, gravatarEmail, score) => (dispatch) => {
  dispatch(getNameAndEmail(name, gravatarEmail));
  localStorage.setItem('state', JSON.stringify({
    player: { name, gravatarEmail, score, assertions: 0 },
  }));
  // const rankingStorage = JSON.parse(localStorage.getItem('ranking'));
  // if (!rankingStorage.length) {
  //   localStorage.setItem('ranking', JSON.stringify([]));
  // }
};

export const getToken = () => async (dispatch) => {
  dispatch(requestToken());
  const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
  try {
    const tokenRequest = await fetch(TOKEN_URL);
    const tokenJSON = await tokenRequest.json();
    dispatch(receiveToken(tokenJSON.token));
    localStorage.setItem('token', tokenJSON.token);
  } catch (e) {
    dispatch(failRequest(e));
  }
};
