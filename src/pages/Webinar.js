import React from "react";
import {Button, Alert, ProgressBar} from 'react-bootstrap';
import WebinarBasics from '../components/webinar/WebinarBasics';
import WebinarScheduling from '../components/webinar/WebinarScheduling';
import * as WebinarActions from "../state/actions/webinar.actions";
import {connect} from "react-redux";
import moment from "moment";

class Webinar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        error : null,
        saveSuccess: false,
        progress: 0,
        webinarName: '',
        webinarTitle: '',
        webinarDescription: '',
        webinarVideo: null,
        sessionStartDate: '',
        sessionEndDate: '',
        sessionRecurrencesNumber: undefined,
        sessionRecurrences: [],
        // presenters: [],
        // notifications: []
      }
    }

    handleWebinarNameChange = (event) => {
      this.setState({webinarName: event.target.value})
    }

    handleWebinarTitleChange = (event) => {
      this.setState({webinarTitle: event.target.value})
    }

    handleWebinarDescriptionChange = (event) => {
      this.setState({webinarDescription: event.target.value})
    }

    handleWebinarVideoChange = (event) => {
      this.setState({webinarVideo: event.target.files[0]})
    }

    // getPresenters = (presenters) => {
    //   this.setState({presenters: presenters})
    // }

    handleSessionStartDateChange = (event) => {
      this.setState({sessionStartDate: event.target.value})
    }

    handleSessionEndDateChange = (event) => {
        this.setState({sessionEndDate: event.target.value})
    }

    handleSessionRecurrencesNumberChange = (event) => {
        let val = undefined;
        if (event.target.value !== "") {
            val = parseInt(event.target.value,10);
        }

        this.setState({sessionRecurrencesNumber: val})
    }

    setSessionRecurrences = (sessionRecurrences) => {
      this.setState({sessionRecurrences: sessionRecurrences})
    }

    // getNotifications = (notifications) => {
    //   this.setState({notifications: notifications})
    // }

    save = () => {
        const {webinarName, webinarVideo, sessionStartDate, sessionEndDate, sessionRecurrences, sessionRecurrencesNumber} = this.state;
        if (webinarName === "" || webinarVideo === "" || sessionStartDate === "" ) {
            this.setState({error: "You must complete the required fields"});
            return
        }

        if (sessionRecurrences.length === 0){
            this.setState({error: "You must set at least one recurrence"});
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
        }) ;

        const webinar = {
            video: {
                name: webinarName,
                video_file : webinarVideo,
            },
            schedule: {
                start_date : sessionStartDate,
                stop_date : sessionEndDate,
                num_events_ahead: sessionRecurrencesNumber,
                recurrences : recurrences
            }
        };

        this.setState({error: null, loading: true, saveSuccess: false});
        WebinarActions.saveWebinar(webinar, this.onUploadProgress).then((response) => {
            //TODO: define if we want to navigate to a different route once the webinar is created
            this.setState({loading: false, saveSuccess: true});
        }).catch((e)=>{
        console.warn(e);
        this.setState({error: "An error occurred during the creation of the webinar.", loading: false})
        });
    };

    onUploadProgress = (event) => {
        this.setState({progress: ((event.loaded / event.total) * 100).toFixed(2)});
    };

    render() {
        const {
          webinarName,
          webinarTitle,
          webinarDescription,
          sessionStartDate,
          sessionEndDate,
          sessionRecurrencesNumber,
          sessionRecurrences,
          loading,
          error,
          saveSuccess,
          progress
        } = this.state;

        return (
          <React.Fragment>
            <h1>Create a Webinar</h1>
            <WebinarBasics
              handleWebinarNameChange={this.handleWebinarNameChange}
              handleWebinarTitleChange={this.handleWebinarTitleChange}
              handleWebinarDescriptionChange={this.handleWebinarDescriptionChange}
              handleWebinarVideoChange={this.handleWebinarVideoChange}
              webinarName={webinarName}
              webinarTitle={webinarTitle}
              webinarDescription={webinarDescription}
            />
            {/* <WebinarPresenters
              getPresenters={this.getPresenters}
            />
            */}
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
            {/* <WebinarNotifications
              getNotifications={this.getNotifications}
            />
            */}
              {error && <Alert variant='danger'>{error}</Alert>}
              {saveSuccess && <Alert variant='success'>Webinar successfully created</Alert>}
              {loading &&<Alert variant='primary'><p>Uploading progress:</p><ProgressBar now={progress} label={`${progress}%`}/></Alert>}
            <Button onClick={this.save} disabled={loading}>{loading ? 'In progress...' : 'Create Webinar'}</Button>
          </React.Fragment>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
};

export default connect(mapStateToProps)(Webinar);
