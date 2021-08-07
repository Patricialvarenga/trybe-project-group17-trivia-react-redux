import React, { Component } from 'react';
import Button from '../components/Button';

class Ranking extends Component {
  render() {
    const rankingStorage = JSON.parse(localStorage.getItem('ranking'));
    console.log(rankingStorage);
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        {rankingStorage
          .sort((a, b) => b.score - a.score)
          .map(({ name, score, picture }, i) => (
            <div key={ `name-${i}` } className="ranking row">
              <img src={ picture } alt={ `${name} avatar` } />
              <h3 data-testid={ `player-name-${i}` }>{name}</h3>
              <h3 data-testid={ `player-score-${i}` }>{score}</h3>
            </div>
          ))}
        <Button
          testid="btn-go-home"
          inner="Voltar ao início"
          to="/"
        />
      </main>
    );
  }
}

export default Ranking;
