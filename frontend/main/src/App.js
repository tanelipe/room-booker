import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Switch } from 'react-router'
import { BrowserRouter, Route} from 'react-router-dom';

import Home from './components/home'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route path='/' component={Home} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App;
