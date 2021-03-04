import React from "react";
import { Row, Col, Button, Form } from 'react-bootstrap';
import { daysOfWeek, getDayOfWeek, timezones } from '../../helpers/options.js';

class WebinarSchedulingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recurrenceDayOfWeek: daysOfWeek[0].value,
            recurrenceStartTime: '',
            recurrenceTimezone: timezones[0].value,
            isAdding: true,
            isEditing: false,
            editingSessionRecurrence: {}
        }
    }

    handleRecurrenceDayOfWeekDateChange = (event) => {
        this.setState({recurrenceDayOfWeek: event.target.value});
    }

    handleRecurrenceStartTimeChange = (event) => {
        this.setState({recurrenceStartTime: event.target.value});
    }

    handleRecurrenceTimezoneChange = (event) => {
        this.setState({recurrenceTimezone: event.target.value});
    }

    handleAddSessionRecurrenceAdd = () => {
        this.setState({isAdding : true})
    }

    handleEditSessionRecurrence = (sessionRecurrence) => {
        this.setState({
            isEditing : true,
            editingSessionRecurrence: sessionRecurrence
        })
    }

    handleDeleteSessionRecurrence = (index) => {
        debugger
        let {sessionRecurrences, setSessionRecurrences} = this.props;
        const recurrences = sessionRecurrences.filter((sessionRecurrence, i) => index !== i);
        setSessionRecurrences(recurrences)
    }

    handleSessionRecurrenceSubmit = (e) => {
        debugger
        e.preventDefault();
        const {recurrenceDayOfWeek, recurrenceStartTime, recurrenceTimezone} = this.state
        const sessionRecurrence = {
            recurrenceDayOfWeek: recurrenceDayOfWeek,
            recurrenceStartTime: recurrenceStartTime,
            recurrenceTimezone: recurrenceTimezone
        }
        let {sessionRecurrences, setSessionRecurrences} = this.props;
        sessionRecurrences.push(sessionRecurrence);
        setSessionRecurrences(sessionRecurrences);
    }

    renderSessionRecurrenceForm = (sessionRecurrence) => {
        const { isEditing, isAdding} = this.state
        const {sessionRecurrences} = this.props
        let { recurrenceDayOfWeek, recurrenceStartTime, recurrenceTimezone} = this.state
        if ( isEditing ) {
            console.log('session recurrence: ', sessionRecurrence)
            // recurrenceDayOfWeek = session.recurrenceDayOfWeek
            // recurrenceStartTime = session.recurrenceStartTime
            // recurrenceTimezone = session.recurrenceTimezone
        }
        return (
            <Row className={ sessionRecurrences.length ? 'border p-3 mb-3' : ''}>
                <Col xs="12" md="4">
                    <Form.Group controlId="recurrenceDayOfWeek">
                        <Form.Label>Day of the week</Form.Label>
                        <Form.Control as="select" onChange={this.handleRecurrenceDayOfWeekDateChange}>
                            {daysOfWeek.map((dayOfWeek, index, array) => {
                                return (
                                    <option key={index} value={dayOfWeek.value}>{dayOfWeek.text}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col xs="12" md="4">
                    <Form.Group controlId="recurrenceStartTime">
                        <Form.Label>Recurrence start time</Form.Label>
                        <Form.Control
                            type="time"
                            value={recurrenceStartTime}
                            onChange={this.handleRecurrenceStartTimeChange}
                        />
                    </Form.Group>
                </Col>
                <Col xs="12" md="4">
                    <Form.Group controlId="recurrenceTimezone">
                        <Form.Label>Recurrence timezone</Form.Label>
                        <Form.Control as="select" onChange={this.handleRecurrenceTimezoneChange}>
                            {timezones.map((timezone, index, array) => {
                                return (
                                    <option key={index} value={timezone.value}>{timezone.text}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>
                </Col>
                { isAdding ? (
                    <Col xs="12">
                        <Button
                            variant="primary"
                            className="mb-2 mb-md-4"
                            onClick={(e) => this.handleSessionRecurrenceSubmit(e)}
                        >
                            Add this session recurrence
                        </Button>
                    </Col>
                ) : isEditing ? (
                    <Col xs="12">
                        <Button
                            variant="primary"
                            className="mb-2 mb-md-4"
                            onClick={(e) => this.handleSessionRecurrenceSubmit(e)}
                        >
                            Edit this session recurrence
                        </Button>
                    </Col>
                ) : null }
            </Row>
        )
    }

    renderSessionRecurrence = (sessionRecurrence, index, array) => {
        console.log('Recurrence DOW: ', getDayOfWeek(sessionRecurrence.recurrenceDayOfWeek))
        return (
            <div key={index} className="p-3">
                <Row className="border bg-light p-2">
                    { sessionRecurrence.isEditing ? (
                        this.renderSessionRecurrenceForm(sessionRecurrence)
                    ) : (
                        <React.Fragment>
                            <Col xs="12" md="8">
                                <p>
                                    <strong>Session recurrence {index + 1}: </strong>
                                    <span>Day: {getDayOfWeek(sessionRecurrence.recurrenceDayOfWeek)}, </span>
                                    <span>Time: {sessionRecurrence.recurrenceStartTime}, </span>
                                    <span>Timezone: {sessionRecurrence.recurrenceTimezone} </span>
                                </p>
                            </Col>
                            <Col className="d-flex justify-content-end">
                                {/*<Button variant="link" onClick={() => this.handleEditSessionRecurrence(sessionRecurrence)}>Edit</Button>*/}
                                <Button variant="link" onClick={() => this.handleDeleteSessionRecurrence(index)}>Delete</Button>
                            </Col>
                        </React.Fragment>
                    )}
                </Row>
            </div>
        )
    }

    render() {
        const { isAdding } = this.state;
        const {
            sessionRecurrences,
            sessionStartDate,
            sessionEndDate,
            sessionRecurrencesNumber,
            handleSessionStartDateChange,
            handleSessionEndDateChange,
            handleSessionRecurrencesNumberChange
        } = this.props;
        return (
            <Form>
                <Row>
                    <Col xs="12" md="4">
                        <Form.Group controlId="sessionStartDate">
                            <Form.Label>Webinar Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={sessionStartDate}
                                onChange={handleSessionStartDateChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs="12" md="4">
                        <Form.Group controlId="sessionEndDate">
                            <Form.Label>Webinar Stop Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={sessionEndDate}
                                onChange={handleSessionEndDateChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs="12" md="4">
                        <Form.Group controlId="sessionRecurrencesNumber">
                            <Form.Label>Number of recurrences</Form.Label>
                            <Form.Control
                                type="number"
                                max="100"
                                value={sessionRecurrencesNumber}
                                onChange={handleSessionRecurrencesNumberChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                {sessionRecurrences.length ? (
                    sessionRecurrences.map(this.renderSessionRecurrence)
                ) : null}
                {isAdding ? (
                    this.renderSessionRecurrenceForm()
                ) : (
                    <Button variant="link" className="mb-4" onClick={this.handleAddSessionRecurrenceAdd}>+ Add
                        recurrence</Button>
                )}
            </Form>
        )
    }
}

export default WebinarSchedulingForm;
