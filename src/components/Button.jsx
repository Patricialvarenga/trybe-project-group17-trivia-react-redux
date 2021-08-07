import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import { setNewRank, resetGame } from '../actions';

class Button extends Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect: false,
    };
    this.redirect = this.redirect.bind(this);
    this.addNewRank = this.addNewRank.bind(this);
  }

  redirect() {
    this.setState({
      shouldRedirect: true,
    });
  }

  addNewRank() {
    const { newRank, name, email, score } = this.props;
    const hashGravatar = MD5(email).toString();
    newRank(name, score, `https://www.gravatar.com/avatar/${hashGravatar}`);
  }

  render() {
    const { testid, inner, to, reset } = this.props;
    const { shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to={ to } />;
    return (
      <button
        data-testid={ testid }
        type="button"
        onClick={ () => {
          this.redirect();
          if (to === '/ranking') this.addNewRank();
          else reset();
        } }
      >
        {inner}
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  newRank: (name, score, picture) => dispatch(setNewRank(name, score, picture)),
  reset: () => dispatch(resetGame()),
});

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.game.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(Button);

Button.propTypes = {
  testid: PropTypes.string.isRequired,
  inner: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  newRank: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
};
