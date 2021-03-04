import React from "react";
import { Row, Col, Button, Card, Accordion, Form } from 'react-bootstrap';

class WebinarPresenters extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        presenters: [],
        name: '',
        email: '',
        title: '',
        isAdding: true,
        isEditing: false,
        editingPresenter: {}
      }
    }

    handleNameChange = (event) => {
      this.setState({name: event.target.value});
    }

    handleEmailChange = (event) => {
      this.setState({email: event.target.value});
    }

    handleTitleChange = (event) => {
      this.setState({title: event.target.value});
    }

    handleAddPresenter = () => {
      this.setState({isAdding : true})
    }

    handleEditPresenter = (presenter) => {
      this.setState({
        isEditing : true,
        editingPresenter: presenter
      })
    }

    handleDeletePresenter = (index) => {
      this.setState(state => {
        const presenters = state.presenters.filter((presenter, i) => index !== i);
        return {
          presenters,
        };
      }, () => {
        this.props.getPresenters(this.state.presenters)
      });
    }

    handlePresenterSubmit = (e) => {
      e.preventDefault();
      const {name, email, title} = this.state
      const presenter = {
        name: name,
        email: email,
        title: title
      }
      this.setState(state => {
        const presenters = [...state.presenters, presenter];
        return {
          presenters,
          name: '',
          email: '',
          title: '',
          isAdding: false
        };
      }, () => {
        this.props.getPresenters(this.state.presenters)
      });
    }

    renderPresenterForm = (presenter) => {
      const { isEditing, isAdding, presenters} = this.state
      let { name, email, title} = this.state
      if ( isEditing ) {
        console.log('presenter: ', presenter)
        // name = presenter.name
        // email = presenter.email
        // title = presenter.title
      }
      return (
        <Form className={ presenters.length ? 'border p-3 mb-3' : ''}>
          <Form.Group controlId="presenterName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={this.handleNameChange}
            />
            <Form.Text className="text-muted">
              Name displayed in the webinar
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="webinarTitle">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={this.handleEmailChange}
            />
          </Form.Group>
          <Form.Group controlId="webinarDescription">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eg. VP Marketing @ Company Name"
              value={title}
              onChange={this.handleTitleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            className="mb-2 mb-md-4"
            onClick={(e) => this.handlePresenterSubmit(e)}
          >
            { isAdding ? (
              'Add this presenter'
            ) : isEditing ? (
              'Edit this presenter'
            ) : null }
          </Button>
        </Form>
      )
    }

    renderPresenter = (presenter, index, array) => {
      return (
        <div key={index} className="p-3">
          <Row className="border bg-light p-2">
            { presenter.isEditing ? (
              this.renderPresenterForm(presenter)
            ) : (
              <React.Fragment>
                <Col xs="12" md="8">
                  <p>
                    <strong>Presenter {index + 1}: </strong>
                    <span>{presenter.name}, </span>
                    { presenter.title ? (
                      <span>{presenter.title}, </span>
                    ) : null }
                    <span>{presenter.email} </span>
                  </p>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button variant="link" onClick={() => this.handleEditPresenter(presenter)}>Edit</Button>
                  <Button variant="link" onClick={() => this.handleDeletePresenter(index)}>Delete</Button>
                </Col>
              </React.Fragment>
            )}
          </Row>
        </div>
      )
    }

    render() {
        const { name, email, title, presenters, isEditing, isAdding } = this.state
        return (
          <Row>
            <Col xs="12">
              <Card className="p-2 p-md-3 mb-3">
                <h2>Presenters { presenters.length ? `(${presenters.length})` : null }</h2>
                <p>Add up to 6 presenters to a webinar, including yourself. You can also add moderators to help with managing the webinar while it's in session.</p>
                { presenters.length ? (
                  presenters.map( this.renderPresenter )
                ) : null }
                { presenters.length === 0 || isAdding ? (
                  this.renderPresenterForm()
                ) : (
                  <Button variant="link" className="mb-4" onClick={this.handleAddPresenter}>+ Add presenter</Button>
                ) }
              </Card>
            </Col>
          </Row>
        )
    }
}

export default WebinarPresenters;
