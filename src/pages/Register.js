import React, {Component} from "react";
import { Container, Row, Col } from 'react-bootstrap';
import ScheduleModal from '../components/ScheduleModal';

class Register extends Component {

  render() {
    return (
      <Container className="pt-3 pt-md-4">
        <Row className="justify-content-md-center">
          <Col xs="12" md={6}>
            <h1>Register</h1>
            <ScheduleModal />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Register