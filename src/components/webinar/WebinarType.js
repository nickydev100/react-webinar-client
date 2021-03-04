import React from "react";
import { Row, Col, Button, Card, Accordion } from 'react-bootstrap';

class WebinarType extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        webinarType: null
      }
    }

    handleTypeClick = (webinarType) => {
      // on successful type set
      this.setState({
        webinarType: webinarType,
      })
    }

    render() {
        const { webinarType } = this.state
        return (
          <Row>
            <Col xs="12" md="6">
              <Card className="p-2 p-md-3 mb-3 text-center">
                <h2>Live Webinar</h2>
                <p>Run a live webinar now, or schedule specific items and dates for the future.</p>
                <Button
                  className="btn btn-primary"
                  onClick={() => this.handleTypeClick("Live")}
                >
                  Start a live webinar
                </Button>
              </Card>
            </Col>
            <Col xs="12" md="6">
              <Card className="p-2 p-md-3 text-center">
                <h2>Pre-recorded Webinar</h2>
                <p>Schedule a webinar from either of your previous live webinars, or choose another precorded video.</p>
                <Button
                  className="btn btn-primary"
                  onClick={() => this.handleTypeClick("Pre-recorded")}
                >
                  Start a pre-recorded webinar
                </Button>
              </Card>
            </Col>
          </Row>
        )
    }
}

export default WebinarType;
