import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedbacks extends Component {
  render() {
    const { assertions } = this.props;
    const minAssertions = 3;
    return (
      <main>
        <Header />
        <h1
          data-testid="feedback-text"
        >
          {assertions < minAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
        </h1>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.game.assertions,
});

Feedbacks.propTypes = {
  assertions: PropTypes.number.isRequired,
};

// const mapDispatchToProps = {

// };

export default connect(mapStateToProps)(Feedbacks);
