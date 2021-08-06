import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedbacks extends Component {
  render() {
    const { assertions, score } = this.props;
    const minAssertions = 3;
    return (
      <main>
        <Header />
        <h1
          data-testid="feedback-text"
        >
          {assertions < minAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
        </h1>
        <h3 data-testid="feedback-total-score">{score}</h3>
        <h4 data-testid="feedback-total-question">{assertions}</h4>
        <Button
          testid="btn-play-again"
          inner="Jogar novamente!"
          to="/"
        />
        <Button
          testid="btn-ranking"
          inner="Ver ranking"
          to="/ranking"
        />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.game.assertions,
  score: state.game.score,
});

Feedbacks.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedbacks);
