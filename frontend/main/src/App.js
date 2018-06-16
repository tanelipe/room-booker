import React, { Component } from 'react'
import { Switch } from 'react-router'
import { BrowserRouter, Route} from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import HomePage from './components/home'
import SignupPage from './components/signup'
import LoginPage from './components/login'
import PageNotFound from './components/404'

const theme = createMuiTheme({
  palette: {
    type: 'light'
  } 
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <BrowserRouter>
            <Switch>
              <Route path='/' component={HomePage} exact={true} />
              <Route path='/signup' component={SignupPage} />
              <Route path='/login' component={LoginPage} />
              <Route component={PageNotFound} />
            </Switch>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
