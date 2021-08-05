import React from 'react';
// import logo from './trivia.png';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';
import Conf from './pages/Conf';

export default function App() {
  return (
    <Switch>
      <Route path="/configuracoes" component={ Conf } />
      <Route path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
