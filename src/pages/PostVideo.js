import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from 'react-bootstrap';

class PostVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <h1>Post a Video</h1>
        <p><Link to="/">Back to Home</Link></p>
        <Row>
          <Col xs="12" md={6}>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Video URL</Form.Label>
                <Form.Control type="text" placeholder="Video URL" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default PostVideo;
