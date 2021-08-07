export const NEW_RANK = 'NEW_RANK';
const newRank = (name, score, picture) => ({
  type: NEW_RANK,
  name,
  score,
  picture,
});

export const setNewRank = (name, score, picture) => async (dispatch) => {
  dispatch(newRank(name, score, picture));
  const rankingStorage = JSON.parse(localStorage.getItem('ranking'));
  localStorage.setItem('ranking', JSON.stringify(
    [
      ...rankingStorage, { name, score, picture },
    ],
  ));
};
