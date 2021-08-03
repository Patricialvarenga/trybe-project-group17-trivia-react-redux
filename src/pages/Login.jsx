import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getToken } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      canLogin: false,
      shouldRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();
    const { fetchToken } = this.props;
    fetchToken();
    this.setState({ shouldRedirect: true });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => this.authenticator());
  }

  authenticator() {
    const { name, email } = this.state;
    const EMAIL_REGEX = /^[a-z0-9_.]+@[a-z0-9]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    this.setState({
      canLogin: (EMAIL_REGEX.test(email) && name.length > 0),
    });
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    const { name, email, canLogin, shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/game" />;

    return (
      <form
        action="GET"
        onSubmit={ this.onSubmit }
      >
        <label htmlFor="name-input">
          Nome
          <input
            type="text"
            value={ name }
            name="name"
            id="name-input"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email-input">
          Email
          <input
            type="email"
            value={ email }
            name="email"
            id="email-input"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          disabled={ !canLogin }
          type="submit"
          data-testid="btn-play"
        >
          Jogar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(getToken()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
};
