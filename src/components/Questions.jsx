import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };
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
              <p data-testid="question-category">{ questions[index].category }</p>
              <p data-testid="question-text">{questions[index].question}</p>
              <p data-testid="correct-answer">{ questions[index].correct_answer }</p>
              { questions[index].incorrect_answers.map((inc, i) => (
                <p key={ inc } data-testid={ `wrong-answer-${i}` }>{inc}</p>
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
