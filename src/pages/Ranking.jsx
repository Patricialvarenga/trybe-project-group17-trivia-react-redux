import React, { Component } from 'react';
import Button from '../components/Button';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Button
          testid="btn-go-home"
          inner="Voltar ao início"
          to="/"
        />
      </div>
    );
  }
}

export default Ranking;
