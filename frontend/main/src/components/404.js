import React, { Component }  from 'react'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent'
import { Typography } from '@material-ui/core';
import NavigationBar from './navigation/index'

const styles = {
  title: {
    marginBottom: 16,
    fontSize: 20,
  },
  card: {
    marginTop: 10
  }
}
class PageNotFound extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <NavigationBar />
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title}>
              Page not found :(
            </Typography>
            <Typography>
              Maybe the page you are looking for has been removed, or you typed in the wrong URL
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}
export default withStyles(styles)(PageNotFound)