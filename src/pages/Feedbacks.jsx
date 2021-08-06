import React, { Component } from 'react';
import FeedbackHeader from '../components/FeedbackHeader';
// import { connect } from 'react-redux';

class Feedbacks extends Component {
  render() {
    return (
      <main>
        <FeedbackHeader />
        <h1 data-testid="feedback-text">Podia ser melhor...</h1>
      </main>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

// const mapDispatchToProps = {

// };

export default Feedbacks;
