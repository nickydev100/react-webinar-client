import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

class Register extends Component {
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
            <h1>Register</h1>
            <Form>
              <Form.Group controlId="registerEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="registerUserName">
                <Form.Label>User name</Form.Label>
                <Form.Control type="text" placeholder="Enter user name" />
              </Form.Group>

              <Form.Group controlId="registerPassword">
                <Form.Label>Set password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit" className="mb-2 mb-md-4">
                Submit
              </Button>
              <p>Already have an account? <Link to="/login">Sign in</Link></p>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Register;
