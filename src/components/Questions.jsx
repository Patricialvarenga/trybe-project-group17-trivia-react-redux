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
      showNext: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.timerFunction = this.timerFunction.bind(this);
    this.timerEnd = this.timerEnd.bind(this);
  }

  componentDidMount() {
    this.timerFunction();
  }

  handleClick() {
    const correctButton = document.querySelector('.correct');
    const wrongAnswers = document.querySelectorAll('.wrong');
    correctButton.classList.add('correct-answer');
    wrongAnswers.forEach((answer) => answer.classList.add('wrong-answer'));
    this.setState({
      showNext: true,
      timer: 0,
    });
  }

  timerEnd() {
    const { timer } = this.state;
    if (timer === 1) {
      this.setState({
        disabled: true,
        showNext: true,
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

  disableButtons() {
    const { timer } = this.state;
    if (timer === 1) {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { index, disabled, timer, showNext } = this.state;

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
        {showNext && <button data-testid="btn-next" type="button">Próxima</button>}
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
