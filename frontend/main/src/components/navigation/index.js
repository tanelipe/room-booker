import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { withRouter } from 'react-router'

import NavigationItemsAuthenticated from './authenticated'
import NagivationItemsLogin from './login'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavigationBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authenticated: false
    } 
  }

  handleHome = () => {
    this.props.history.push('/')
  }

  handleSignup = () => {
    this.props.history.push('/signup')
  }

  handleLogin =  () => {
    this.props.history.push('/login')
  }

  render() {
    const { classes } = this.props
    const { authenticated } = this.state

    let navigationItems
    if (authenticated) {
      navigationItems = <NavigationItemsAuthenticated />
    } else {
      navigationItems = <NagivationItemsLogin 
        onHome={this.handleHome} 
        onLogin={this.handleLogin}
        onSignup={this.handleSignup}/> 
    }
    return (
      <div className={classes.root}>
        <AppBar position='static' color='default'>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Room Booking
            </Typography>
            {navigationItems}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(NavigationBar))