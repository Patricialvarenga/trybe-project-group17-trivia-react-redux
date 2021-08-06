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
    const ten = 10;
    const { score } = this.state;
    const { scoreUpdater } = this.props;
    const newScore = score + ten + (timer * diffWeight);
    if (target.classList.contains('true')) {
      this.setState({ score: newScore });
      scoreUpdater(newScore);
    } else {
      this.setState({ score: 0 });
      scoreUpdater(0);
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
        if (prevState.timer !== 0) {
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
    const four = 4;
    if (index < four) {
      this.setState({
        index: index + 1, showAnswers: false, showNext: false, disabled: false, timer: 30,
      });
    } else this.setState({ shouldRedirect: true });
    this.timerFunction();
    this.timerEnd();
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
            Próxima
          </button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  scoreUpdater: (score) => dispatch(setNewScore(score)),
});

export default connect(null, mapDispatchToProps)(Questions);

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  scoreUpdater: PropTypes.func.isRequired,
};
