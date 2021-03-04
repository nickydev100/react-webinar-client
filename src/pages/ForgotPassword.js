import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <Container className="pt-3 pt-md-4">
        <Row className="justify-content-md-center">
          <Col xs="12" md={6}>
            <h1>Forgot Password?</h1>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>User Name or Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter user name or email address" />
              </Form.Group>
              <Button variant="primary" type="submit" className="mb-2 mb-md-4">
                Submit
              </Button>
              <p><Link to="/login">Back to Sign in</Link></p>
              <p><Link to="/register">Register</Link></p>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ForgotPassword;
