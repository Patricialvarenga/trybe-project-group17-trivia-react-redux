import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Feedbacks extends Component {
  render() {
    return (
      <div>
        <h1>feedback</h1>
        <textarea data-testid="feedback-text" cols="30" rows="10" />
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

// const mapDispatchToProps = {

// };

export default Feedbacks;
