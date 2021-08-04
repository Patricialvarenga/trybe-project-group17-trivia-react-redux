import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Questions from '../components/Questions';

class Game extends Component {
  render() {
    const { nome, email } = this.props;
    const hashGravatar = md5(email).toString();
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hashGravatar}` }
            alt="avatar"
          />
          <p data-testid="header-player-name">{ nome }</p>
          <p data-testid="header-score">0</p>
        </header>
        <Questions />
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.player.name,
  email: state.player.email,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string,
};

Game.defaultProps = {
  email: undefined,

};
