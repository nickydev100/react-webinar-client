import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

class PageNotFound extends Component {
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
          <h1>Page Not Found</h1>
          <p>
            <Link to="/">
              <i className={`fa fa-fw fa-home`}/>
              Return Home
            </Link>
          </p>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default PageNotFound;
