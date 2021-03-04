import React from "react";
import useAccordionToggle from 'react-bootstrap/AccordionToggle';
import { Row, Col, Button, Card, Accordion, Form } from 'react-bootstrap';

class WebinarBasics extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        const {
          handleWebinarNameChange,
          handleWebinarTitleChange,
          handleWebinarDescriptionChange,
          handleWebinarVideoChange,
          webinarName,
          webinarTitle,
          webinarDescription,
          webinarVideo
        } = this.props
        return (
          <Row>
            <Col xs="12">
              <Card className="p-2 p-md-3 mb-3">
                <h2>Basics</h2>
                <Form>
                  <Form.Group controlId="webinarName">
                    <Form.Label>Webinar name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="A unique name, for your refernce"
                      value={webinarName}
                      onChange={handleWebinarNameChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="webinarVideo">
                    <Form.Label>Upload a video</Form.Label>
                    <Form.Control
                      type="file"
                      value={webinarVideo}
                      onChange={handleWebinarVideoChange}
                    />
                  </Form.Group>
                  {/* <Form.Group controlId="webinarTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Visible to those you invite and who attend"
                      value={webinarTitle}
                      onChange={handleWebinarTitleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="webinarDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      value={webinarDescription}
                      onChange={handleWebinarDescriptionChange}
                    />
                  </Form.Group>
                  */}
                </Form>
              </Card>
            </Col>
          </Row>
        )
    }
}

export default WebinarBasics;
