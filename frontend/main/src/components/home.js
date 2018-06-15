import React, { Component } from 'react'
import { Card, CardTitle } from 'material-ui/Card'

class Home extends Component {
  render() {
    return (
      <Card className="container">
        <CardTitle title="Room Booking" subtitle="Home page" />
      </Card>
    )
  }
}

export default Home