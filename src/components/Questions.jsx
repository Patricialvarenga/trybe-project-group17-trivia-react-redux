/* eslint-disable max-lines-per-function */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { setNewScore } from '../actions';

class Questions extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      disabled: false,
      timer: 30,
      showNext: false,
      score: 0,
      shouldRedirect: false,
      showAnswers: false,
    };
    this.four = 4;
    this.ten = 10;

    this.handleClick = this.handleClick.bind(this);
    this.timerFunction = this.timerFunction.bind(this);
    this.timerEnd = this.timerEnd.bind(this);
    this.clickNext = this.clickNext.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  componentDidMount() {
    this.timerFunction();
    this.timerEnd();
  }

  handleClick(target, diff) {
    clearInterval(this.countdown);
    clearTimeout(this.timeOut);
    const diffWeight = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    this.setState({
      showNext: true,
      showAnswers: true,
    }, this.updateScore(diffWeight[diff], target));
  }

  updateScore(diffWeight, target) {
    const { timer } = this.state;
    const { score } = this.state;
    const { scoreUpdater } = this.props;
    const newScore = score + this.ten + (timer * diffWeight);
    if (target.classList.contains('true')) {
      this.setState({ score: newScore });
      scoreUpdater(newScore);
    }
  }

  timerEnd() {
    const thirySeconds = 30000;
    this.timeOut = setTimeout(() => {
      this.setState({
        disabled: true,
        showNext: true,
        showAnswers: true,
      });
    }, thirySeconds);
  }

  timerFunction() {
    const oneSecond = 1000;
    this.countdown = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer > 0) {
          return ({
            ...prevState,
            timer: prevState.timer - 1,
          });
        }
      });
    }, oneSecond);
  }

  clickNext() {
    const { index } = this.state;
    if (index < this.four) {
      this.setState({
        index: index + 1, showAnswers: false, showNext: false, disabled: false, timer: 30,
      });
    } else this.setState({ shouldRedirect: true });
    this.timerEnd();
    this.timerFunction();
  }

  render() {
    const { index, disabled, timer, showNext, shouldRedirect, showAnswers } = this.state;
    if (shouldRedirect) return <Redirect to="/feedbacks" />;
    const { questions } = this.props;
    return (
      <div>
        <h2>{timer}</h2>
        <h2 data-testid="question-category">{atob(questions[index].category)}</h2>
        <h4 data-testid="question-text">{atob(questions[index].question)}</h4>
        {questions[index].alternatives.map(({
          answer, isCorrect, testid, className,
        }, mapIndex) => (
          <button
            type="button"
            key={ `answer-${mapIndex}` }
            data-testid={ testid }
            className={ showAnswers ? `${className} ${isCorrect}` : `${isCorrect}` }
            disabled={ disabled }
            onClick={ ({ target }) => (
              this.handleClick(target, atob(questions[index].difficulty))
            ) }
          >
            {atob(answer)}
          </button>
        ))}
        {showNext && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.clickNext }
          >
            {index < this.four ? 'Próxima' : 'Finalizar'}
          </button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  scoreUpdater: (score) => dispatch(setNewScore(score)),
  // newRank: (name, score, picture) => dispatch(setNewRank(name, score, picture)),
});

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  scoreUpdater: PropTypes.func.isRequired,
  // newRank: PropTypes.func.isRequired,
  // name: PropTypes.string.isRequired,
  // email: PropTypes.string.isRequired,
};
