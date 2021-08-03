import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      canLogin: false,
    };
    this.handleChange = this.handleChange.bind(this);
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
  }

  render() {
    const { name, email, canLogin } = this.state;
    return (
      <form>
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
          type="button"
          data-testid="btn-play"
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default Login;
