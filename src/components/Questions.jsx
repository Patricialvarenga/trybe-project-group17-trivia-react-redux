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
  }

  componentDidMount() {
    this.timerFunction();
  }

  handleClick(target, diff) {
    const diffWeight = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const { timer } = this.state;
    const ten = 10;
    this.setState({
      showNext: true,
      timer: 0,
      showAnswers: true,
    }, () => {
      const { score } = this.state;
      const { scoreUpdater } = this.props;
      const newScore = score + ten + (timer * diffWeight[diff]);
      if (target.classList.contains('true')) {
        this.setState({ score: newScore });
        scoreUpdater(newScore);
      } else {
        this.setState({ score: 0 });
        scoreUpdater(0);
      }
    });
  }

  timerEnd() {
    const { timer } = this.state;
    if (timer === 1) {
      this.setState({
        disabled: true,
        showNext: true,
        showAnswers: true,
      });
    }
  }

  timerFunction() {
    const oneSecond = 1000;
    setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer !== 0) {
          return ({
            ...prevState,
            timer: prevState.timer - 1,
          });
        }
      }, this.timerEnd());
    }, oneSecond);
  }

  clickNext() {
    const { index } = this.state;
    const four = 4;
    if (index < four) {
      this.setState({
        index: index + 1, showAnswers: false, showNext: false,
      });
    } else this.setState({ shouldRedirect: true });
  }

  disableButtons() {
    const { timer } = this.state;
    if (timer === 1) {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { index, disabled, timer, showNext, shouldRedirect, showAnswers } = this.state;
    if (shouldRedirect) return <Redirect to="/feedbacks" />;
    const { questions } = this.props;
    if (!questions.length) return 'Loading';
    const alternatives = [
      ...questions[index].incorrect_answers.map((answer, i) => ({
        answer,
        i,
        testid: `wrong-answer-${i}`,
        className: 'wrong-answer',
        isCorrect: false,
      })), {
        answer: questions[index].correct_answer,
        testid: 'correct-answer',
        className: 'correct-answer',
        isCorrect: true,
      },
    ];
    return (
      <div>
        <h2>{timer}</h2>
        <h2 data-testid="question-category">{questions[index].category}</h2>
        <h4 data-testid="question-text">{questions[index].question}</h4>
        {alternatives.map(({ answer, isCorrect, testid, className }, mapIndex) => (
          <button
            type="button"
            key={ `answer-${mapIndex}` }
            data-testid={ testid }
            className={ showAnswers ? `${className} ${isCorrect}` : `${isCorrect}` }
            disabled={ disabled }
            onClick={ ({ target }) => (
              this.handleClick(target, questions[index].difficulty)
            ) }
          >
            {answer}
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

const mapStateToProps = (state) => ({
  questions: state.game.results,
});

const mapDispatchToProps = (dispatch) => ({
  scoreUpdater: (score) => dispatch(setNewScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  scoreUpdater: PropTypes.func.isRequired,
};
