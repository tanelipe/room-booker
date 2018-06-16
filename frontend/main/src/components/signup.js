import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import NavigationBar from './navigation'
import { createUser } from './../actions/api'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: theme.spacing.unit
  },
  row: {
    maxWidth: 200
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})
class SignupPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'username': '',
      'password': '',
      'first_name': '',
      'last_name': '',
      'passwordConfirmation' : '',
      'errors' : { 
        'username-taken': false,
        'password-mismatch' : false
      }
    }

    this.handleInputChanged = this.handleInputChanged.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validate = this.validate.bind(this)
    this.clearErrors = this.clearErrors.bind(this)
  }

  handleInputChanged(event) {
    const value = event.target.value
    const name = event.target.id
    
    this.setState({
      [name]: value
    })
  }

  validate() {
    let success = true
    const password = this.state.password
    const passwordConfirmation = this.state.passwordConfirmation
    let errors = this.state.errors
    if (password !== passwordConfirmation) {
      errors['password-mismatch'] = true
      success = false
      this.setState({
        [errors]: errors
      })
    }
    return success
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.validate()) {
      const target = event.target
      createUser(this.state.username, this.state.password, 
        this.state.first_name, this.state.last_name, (err, response) => {
        if (err) { 
          const errorResponse = err.response
          if (errorResponse.status === 400) {
            if (errorResponse.statusText.includes('username')) {
              let errors = this.state.errors
              errors['username-taken'] = true
              this.setState({
                [errors]: errors
              })
            }
          }
        } else {
          if (response.status === 201) {
            target.reset()
            this.clearErrors()
            this.props.history.push('/')
          }
        }
      })
    }
  }

  clearErrors() {
    let errors = this.state.errors
    errors['password-mismatch'] = false
    errors['username-taken'] = false
    this.setState({
      [errors]: errors
    })
  }

  render() {
    const { classes }  = this.props
    const errors = this.state.errors
    const passwordError = errors['password-mismatch']
    const usernameTaken = errors['username-taken']
    return (
     
      <div>
        <NavigationBar />
        <form className={classes.container + ' form-horizontal'} autoComplete="off" onSubmit={this.handleSubmit}>
          <div className={classes.row}>
            <TextField required id='first_name' label='Firstname' placeholder='Enter your firstname'
               className={classes.textField} margin='normal' onChange={this.handleInputChanged}/>
            <TextField required id='last_name' label='Lastname' placeholder='Enter your lastname' 
              className={classes.textField} margin='normal' onChange={this.handleInputChanged}/>

            { usernameTaken ? (
              <TextField required id='username' label='Username' placeholder='Enter username' 
                className={classes.textField} margin='normal' onChange={this.handleInputChanged}
                error helperText='Username is already in use'/>  
            ) : (
              <TextField required id='username' label='Username' placeholder='Enter username' 
                className={classes.textField} margin='normal' onChange={this.handleInputChanged}/>
            ) }            
            
            <TextField required id='password' label='Password' placeholder='Enter password' 
              className={classes.textField} margin='normal' type='password' onChange={this.handleInputChanged}/>

            { passwordError ? (
              <TextField required id='passwordConfirmation' label='Password Confirmation'
                placeholder='Enter password again' className={classes.textField} margin='normal' type='password' onChange={this.handleInputChanged}
                error helperText='Please make sure the passwords match'/>            
            ) : (
              <TextField required id='passwordConfirmation' label='Password Confirmation'
              placeholder='Enter password again' className={classes.textField} margin='normal' type='password' onChange={this.handleInputChanged}/>            
            ) }
            <Button type='submit' variant='contained' color='primary' className={classes.button}>
              Submit
            </Button>
          </div> 
        </form>
      </div>
    )
  }
}
export default withStyles(styles)(SignupPage)