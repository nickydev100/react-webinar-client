import React from "react";
import { Row, Col, Button, Card, Accordion, Form } from 'react-bootstrap';

class WebinarNotifications extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        individualView: false,
        allViewed: false,
        notifications: new Map()
      }
    }

    handleChange = (event) => {
      const { name, checked } = event.target
      this.setState( prevState => ({ notifications: prevState.notifications.set(name, checked) }));
    }

    handleAllViewedChange = (event) => {
      this.setState({
        allViewed: event.target.checked
      }, () => {
        this.props.getNotifications(this.state)
      });
    }

    handleIndividualViewChange= (event) => {
      this.setState({
        individualView: event.target.checked
      }, () => {
        this.props.getNotifications(this.state)
      })
    }

    render() {
        const { individualView, allViewed, notifications } = this.state
        return (
          <Row>
            <Col xs="12">
              <Card className="p-2 p-md-3 mb-3 text-center">
                <h2>Notifications</h2>
                <p>I want to be notified when:</p>
                <Form.Check
                  type='checkbox'
                  id='checkAllViewers'
                  label='All viewers have completed the webinar'
                  name='allViewed'
                  checked={notifications.get('allViewed')}
                  onChange={this.handleChange}
                />
                <Form.Check
                  type='checkbox'
                  id='checkIndividualViewers'
                  label='Each viewer has completed the webinar'
                  name='individualView'
                  checked={notifications.get('individualView')}
                  onChange={this.handleChange}
                />
              </Card>
            </Col>
          </Row>
        )
    }
}

export default WebinarNotifications;
