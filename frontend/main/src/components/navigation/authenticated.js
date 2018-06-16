import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

class NavigationItemsAuthenticated extends Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorElement: null
    }
  }
   
  handleMenu = event => {
    this.setState({ anchorElement: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorElement: null });
  }
  render() {
    const { anchorElement } = this.state
    const open = Boolean(anchorElement)
    
    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElement}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
}
export default NavigationItemsAuthenticated