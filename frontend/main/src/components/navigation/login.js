import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Button from '@material-ui/core/Button'

class NavigationItemsLogin extends Component {
  render() {
    return (
      <div>
        <Button color='inherit' onClick={this.props.onHome}>Home</Button>
        <Button color='inherit' onClick={this.props.onLogin}>Login</Button>
        <Button color='inherit' onClick={this.props.onSignup}>Signup</Button>
      </div>
    )
  }
}
NavigationItemsLogin.propTypes = {
  onHome: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired
}

export default NavigationItemsLogin