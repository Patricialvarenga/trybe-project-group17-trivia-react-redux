import { combineReducers } from 'redux';
import player from './player';
import game from './game';
import ranking from './ranking';

const rootReducer = combineReducers({ player, game, ranking });
export default rootReducer;
