import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FeedbackHeader extends Component {
  render() {
    const { name, email, score } = this.props;
    const hashGravatar = md5(email).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hashGravatar}` }
          alt="Gravatar"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <h4 data-testid="header-score">{score}</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.game.score,
});

FeedbackHeader.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(FeedbackHeader);
