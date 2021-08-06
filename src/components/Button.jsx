import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Button extends Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect: false,
    };
    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    this.setState({
      shouldRedirect: true,
    });
  }

  render() {
    const { testid, inner, to } = this.props;
    const { shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to={ to } />;
    return (
      <button
        data-testid={ testid }
        type="button"
        onClick={ this.redirect }
      >
        {inner}
      </button>
    );
  }
}

export default Button;

Button.propTypes = {
  testid: PropTypes.string.isRequired,
  inner: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
