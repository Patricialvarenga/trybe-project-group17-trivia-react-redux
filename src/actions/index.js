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
