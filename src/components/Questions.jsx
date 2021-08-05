import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      disabled: false,
      timer: 30,
    };
    this.handleClick = this.handleClick.bind(this);
    this.timerFunction = this.timerFunction.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
  }

  componentDidMount() {
    this.timerFunction();
  }

  handleClick() {
    const correctButton = document.querySelector('.correct');
    const wrongAnswers = document.querySelectorAll('.wrong');
    correctButton.classList.add('correct-answer');
    wrongAnswers.forEach((answer) => answer.classList.add('wrong-answer'));
  }

  disableButtons() {
    const { timer } = this.state;
    if (timer === 1) {
      this.setState({
        disabled: true,
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
      }, this.disableButtons());
    }, oneSecond);
  }

  render() {
    const { index, disabled, timer } = this.state;
    const { questions } = this.props;
    return (
      <div>
        <h2>{timer}</h2>
        { !questions.length
          ? null
          : (
            <div>
              <h2 data-testid="question-category">{ questions[index].category }</h2>
              <strong data-testid="question-text">{questions[index].question}</strong>
              <button
                type="button"
                data-testid="correct-answer"
                className="correct"
                onClick={ this.handleClick }
                disabled={ disabled }
              >
                { questions[index].correct_answer }
              </button>
              { questions[index].incorrect_answers.map((inc, i) => (
                <button
                  type="button"
                  key={ inc }
                  data-testid={ `wrong-answer-${i}` }
                  className="wrong"
                  onClick={ this.handleClick }
                  disabled={ disabled }
                >
                  {inc}
                </button>
              ))}
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.results,
});

export default connect(mapStateToProps)(Questions);

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
