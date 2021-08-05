import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const correctButton = document.querySelector('.correct');
    const wrongAnswers = document.querySelectorAll('.wrong');
    correctButton.classList.add('correct-answer');
    wrongAnswers.forEach((answer) => answer.classList.add('wrong-answer'));
  }

  render() {
    const { index } = this.state;
    const { questions } = this.props;
    return (
      <div>
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
