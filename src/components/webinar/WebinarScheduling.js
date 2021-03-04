import React from "react";
import { Row, Col, Card } from 'react-bootstrap';
import WebinarSchedulingForm from "./WebinarSchedulingForm";

class WebinarScheduling extends React.Component {
    render() {
        return (
          <Row>
            <Col xs="12">
              <Card className="p-2 p-md-3 mb-3">
                <h2>Sessions</h2>
                <p>Schedule upcoming viewing sessions for your webinar</p>
                <WebinarSchedulingForm {...this.props} />
              </Card>
            </Col>
          </Row>
        )
    }
}

export default WebinarScheduling;
