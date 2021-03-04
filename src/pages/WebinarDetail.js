import React from "react";
import {Button, Alert, ProgressBar, Spinner, Col, Card, Form, Row, FormControl} from 'react-bootstrap';
import WebinarScheduling from '../components/webinar/WebinarScheduling';
import {connect} from "react-redux";
import {fetchWebinar, updateWebinarSchedule} from "../state/actions/webinar.actions";
import {updateWebinarVideo} from "../state/actions/webinar.actions";
import moment from "moment";

class WebinarDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            progress: 0,
            video: null,
            schedule: null,
            editWebinarName: null,
            editVideo: null,
            showChooseFile: false,
            updatingBasic: false,
            updateBasicError: null,
            uploadingVideo: false,
            updatingBasicSuccess: false,

            editingSchedule: false,
            updatingRecurrences: false,
            updatingRecurrencesSuccess: false,
            updatingRecurrencesError: null,
            sessionStartDate: '',
            sessionEndDate: '',
            sessionRecurrencesNumber: undefined,
            sessionRecurrences: []
        }
    }

    getWebinarId = () => {
        const {match} = this.props;
        return parseInt(match.params.webinarId, 10);
    };

    async componentDidMount() {
        const webinarId = this.getWebinarId();
        this.setState({loading: true});
        try {
            const webinar = await fetchWebinar(webinarId);
            this.setState({loading: false, video: webinar.video, schedule: webinar.schedule});
        } catch (e) {
            console.warn(e);
            this.setState({loading: false, error: "It was not possible to load the webinar information"});
        }
    }

    onUploadProgress = (event) => {
        this.setState({progress: ((event.loaded / event.total) * 100).toFixed(2)});
    };

    handleEditWebinarNameChange = (event) => {
        this.setState({editWebinarName: event.target.value});
    };

    handleVideoChange = (event) => {
        this.setState({editVideo: event.target.files[0]})
    };

    updateVideo = async () => {
        const {editWebinarName, editVideo, video} = this.state;
        if (editWebinarName !== null && editWebinarName === '') {
            this.setState({updateBasicError: "Webinar name cannot be empty"});
            return
        }

        let payload = {};
        if (editWebinarName) {
            payload.name = editWebinarName;
        } else {
            payload.name = video.name;
        }

        if (editVideo) {
            payload.video_file = editVideo
        }

        this.setState({
            updatingBasic: true,
            uploadingVideo: (editVideo !== null),
            updateBasicError: null,
            updatingBasicSuccess: false
        });
        try {
            const videoResponse = await updateWebinarVideo(this.getWebinarId(), payload, this.onUploadProgress);
            this.setState({
                video: videoResponse,
                updatingBasic: false,
                uploadingVideo: false,
                updatingBasicSuccess: true,
                editWebinarName: null,
                editVideo: null,
                showChooseFile: false
            });
        } catch (e) {
            console.warn(e);
            let error = "An error occurred during the update operation";
            if (e.response && e.response.data) {
                console.warn(e.response.data);
            }
            this.setState({updateBasicError: error, updatingBasic: false, uploadingVideo: false});
        }
    };

    clearVideoChanges = () => {
        this.setState({editWebinarName: null, editVideo: null, showChooseFile: false});
    };

    handleReplace = () => {
        this.setState({showChooseFile: true})
    };

    recurrenceToString = (recurrence) => {
        const {dow} = this.props;
        return `${dow[recurrence.dow_pattern]} at ${this.recurrenceTime(recurrence)} ${recurrence.timezone}`
    };

    recurrenceTime = (recurrence) => {
        return `${recurrence.hour.toLocaleString(undefined, {minimumIntegerDigits: 2})}:${recurrence.minute.toLocaleString(undefined, {minimumIntegerDigits: 2})}`
    };

    onEditRecurrences = () => {
        const {schedule} = this.state;

        const recurrences = schedule.recurrences.map((r) => {
            return {
                recurrenceDayOfWeek: r.dow_pattern.toString(10),
                recurrenceStartTime: this.recurrenceTime(r),
                recurrenceTimezone: r.timezone
            }
        });

        this.setState({
            sessionStartDate: schedule.start_date || '',
            sessionEndDate: schedule.stop_date || '',
            sessionRecurrencesNumber: schedule.num_events_ahead || undefined,
            sessionRecurrences: recurrences || [],
            editingSchedule: true
        });
    };

    onCancelEditRecurrences = () => {
        this.setState({editingSchedule: false, updatingRecurrencesError: null});
    };

    handleSessionStartDateChange = (event) => {
        this.setState({sessionStartDate: event.target.value})
    };

    handleSessionEndDateChange = (event) => {
        this.setState({sessionEndDate: event.target.value})
    };

    handleSessionRecurrencesNumberChange = (event) => {
        let val = undefined;
        if (event.target.value !== "") {
            val = parseInt(event.target.value, 10);
        }

        this.setState({sessionRecurrencesNumber: val})
    };

    setSessionRecurrences = (sessionRecurrences) => {
        this.setState({sessionRecurrences: sessionRecurrences})
    };

    updateRecurrences = async () => {
        const {sessionStartDate, sessionEndDate, sessionRecurrences, sessionRecurrencesNumber, schedule} = this.state;
        if (sessionStartDate === "") {
            this.setState({updatingRecurrencesError: "You must complete the required fields"});
            return
        }

        if (sessionRecurrences.length === 0) {
            this.setState({updatingRecurrencesError: "You must set at least one recurrence"});
            return
        }

        const recurrences = sessionRecurrences.map((rec) => {
            const time = moment(rec.recurrenceStartTime, ['h:m a', 'H:m']);
            return {
                skip_pattern: "dow",
                dow_pattern: parseInt(rec.recurrenceDayOfWeek, 10),
                hour: time.hour(),
                minute: time.minute(),
                timezone: rec.recurrenceTimezone
            }
        });

        const newSchedule = {
            start_date: sessionStartDate,
            stop_date: sessionEndDate,
            num_events_ahead: sessionRecurrencesNumber,
            recurrences: recurrences,
            published: schedule.published
        };

        this.setState({updatingRecurrences: true, updatingRecurrencesSuccess: false, updatingRecurrencesError: null});
        try {
            const scheduleResponse = await updateWebinarSchedule(this.getWebinarId(), newSchedule);
            this.setState({
                schedule: scheduleResponse,
                updatingRecurrences: false,
                updatingRecurrencesSuccess: true,
                editingSchedule: false
            });
        } catch (e) {
            console.warn(e);
            let error = "An error occurred during the update operation";
            if (e.response && e.response.data) {
                console.warn(e.response.data);
            }
            this.setState({updatingRecurrencesError: error, updatingRecurrences: false});
        }

    };

    render() {
        const {
            loading, error, webinar, progress, editWebinarName,
            showChooseFile, uploadingVideo, updatingBasic, updateBasicError, updatingBasicSuccess,
            editingSchedule, sessionStartDate, sessionEndDate, sessionRecurrencesNumber, sessionRecurrences,
            updatingRecurrences, updatingRecurrencesSuccess, updatingRecurrencesError,
            video, schedule
        } = this.state;

        if (loading) {
            return (<div style={{textAlign: 'center'}}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>)
        }

        if (error && webinar === null) {
            return (<Alert variant='danger'>{error}</Alert>);
        }

        const url = (!!video && !!video.video_file && video.video_file) || "";
        const isEditingBasic = (showChooseFile || (editWebinarName !== null && editWebinarName !== video.name));
        return (
            <React.Fragment>
                <h1>{video.name}</h1>
                <Row>
                    <Col xs="12">
                        <Card className="p-2 p-md-3 mb-3">
                            <Card.Body>
                                <h2>Basics</h2>
                                <Row>
                                    <Col xs="12" md="2">
                                        <Form.Label>Webinar Name</Form.Label>
                                    </Col>
                                    <Col xs="12" md="10">
                                        <FormControl type="text"
                                                     placeholder="A unique name, for your refernce"
                                                     value={editWebinarName || video.name}
                                                     onChange={this.handleEditWebinarNameChange}/>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: "2em"}}>
                                    <Col xs="12" md="2">Video</Col>
                                    <Col xs="12" md="10">
                                        {showChooseFile ? (
                                            <Form.Group controlId="webinarVideo">
                                                <Form.Label>Upload a video</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    onChange={this.handleVideoChange}
                                                />
                                            </Form.Group>
                                        ) : (
                                            <React.Fragment>
                                                <video width="320" height="240" controls>
                                                    <source src={url} type="video/mp4"/>
                                                    Sorry, your browser doesn't support embedded videos.
                                                </video>
                                                {video.title && <p>{video.title}</p>}
                                                <p>
                                                    <Button variant="light" onClick={this.handleReplace}>Replace
                                                        Video</Button>
                                                </p>
                                            </React.Fragment>
                                        )}

                                    </Col>
                                </Row>
                                <Row style={{marginTop: "2em"}}>
                                    <Col xs="12" md={{span: 10, offset: 2}}>
                                        <Button onClick={this.updateVideo} disabled={!isEditingBasic || updatingBasic}>
                                            {updatingBasic && <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />}
                                            <span> Save changes</span>
                                        </Button>

                                        {isEditingBasic &&
                                        <Button variant="link" disabled={updatingBasic}
                                                onClick={this.clearVideoChanges}>Clear changes</Button>}
                                    </Col>
                                </Row>
                                {updateBasicError &&
                                <Alert style={{marginTop: "1em"}} variant='danger'>{updateBasicError}</Alert>}
                                {uploadingVideo &&
                                <Alert style={{marginTop: "1em"}} variant='primary'><p>Uploading progress:</p>
                                    <ProgressBar now={progress} label={`${progress}%`}/></Alert>}
                                {updatingBasicSuccess &&
                                <Alert style={{marginTop: "1em"}} variant='success '>Update successful</Alert>}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card className="p-2 p-md-3 mb-3">
                            <h2>Schedules</h2>
                            <Row>
                                <Col xs="12" md="2">
                                    <Form.Label>Recurring Sessions</Form.Label>
                                </Col>
                                <Col xs="12" md="10">
                                    {editingSchedule ? (
                                        <WebinarScheduling
                                            handleSessionStartDateChange={this.handleSessionStartDateChange}
                                            handleSessionEndDateChange={this.handleSessionEndDateChange}
                                            handleSessionRecurrencesNumberChange={this.handleSessionRecurrencesNumberChange}
                                            setSessionRecurrences={this.setSessionRecurrences}
                                            sessionStartDate={sessionStartDate}
                                            sessionEndDate={sessionEndDate}
                                            sessionRecurrencesNumber={sessionRecurrencesNumber || ''}
                                            sessionRecurrences={sessionRecurrences}
                                        />
                                    ) : (
                                        <Alert variant="dark">
                                            <p>
                                                {`From ${schedule.start_date} to ${schedule.stop_date || "indefinite time"} recurring ${schedule.num_events_ahead} times.`}
                                            </p>
                                            <ul>
                                                {schedule.recurrences.map((recurrence) => {
                                                    return <li
                                                        key={recurrence.id}>{this.recurrenceToString(recurrence)}</li>
                                                })}
                                            </ul>
                                            <p>
                                                <Button variant="primary" onClick={this.onEditRecurrences}>Edit</Button>
                                            </p>
                                        </Alert>
                                    )}
                                </Col>
                            </Row>
                            {editingSchedule &&
                            <Row style={{marginTop: "2em"}}>
                                <Col xs="12" md={{span: 10, offset: 2}}>
                                    <Button onClick={this.updateRecurrences} disabled={updatingRecurrences}>
                                        {updatingRecurrences && <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />}
                                        <span> Save changes</span>
                                    </Button>
                                    <Button variant="link" disabled={updatingRecurrences}
                                            onClick={this.onCancelEditRecurrences}>Clear changes</Button>
                                </Col>
                            </Row>}
                            {updatingRecurrencesError &&
                            <Alert style={{marginTop: "1em"}}
                                   variant='danger'>{updatingRecurrencesError}</Alert>}
                            {updatingRecurrencesSuccess &&
                            <Alert style={{marginTop: "1em"}} variant='success '>Update successful</Alert>}
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        dow: state.app.dow,
        ...ownProps
    }
};

export default connect(mapStateToProps)(WebinarDetail);
