import React from 'react';
// import logo from './trivia.png';
import './App.css';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
