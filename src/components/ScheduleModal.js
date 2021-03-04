import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';
import * as ScheduleActions from '../state/actions/schedules.actions';
import * as SessionActions from '../state/actions/session.actions';
import styled from 'styled-components';
import DropDown from './DropDown';
import Button from './Button';
import Input from './Input';
import * as moment from 'moment';
import qs from 'qs';
import { createRegistration } from '../utils/api/schedules.api';

const ModalWrapper = styled.div`
    box-shadow: 0 0 4px rgba(0,0,0,0.3);
    padding: 1.4rem;
    background: white;
    border-radius: 8px;
    z-index: 999;
    width: 400px;
    display: flex;
    flex-wrap: wrap;
`

const StyledDropDown = styled(props => <DropDown {...props} />)`
    margin-bottom: 14px;
`


class ScheduleModal extends React.Component {

    state = {
        selectedTimezone: null,
        availableTimes: [],
        emailError: null,
        email: '',
        registrationSuccessful: false
    }

    componentDidMount() {
        const { getVideoSchedule, location } = this.props;
        const query = qs.parse(location.search, { ignoreQueryPrefix: true })

        getVideoSchedule(query.video)
    }

    changeEmail = (email) => {
        this.setState({
            email
        })
    }

    changeName = (name) => this.setState({name});

    changeTimezone = (option = {}) => {
        const { schedule } = this.props;

        this.setState({
            selectedTimezone: option.value,
            availableTimes: !!option.value ? schedule.future_events.filter((sched) => sched.origin_timezone === option.value) : [],
        })
    }

    changeDate = (option = {}) => {
        this.setState({
            selectedDate: (option.value || {}).start_time,
            selectedSchedule: (option.value || {}).schedule,
        })
        // selectedSchedule is redundant here, could pas in the entire schedule object instead maybe.
        // Would need to modify validations
    }

    validateEmail = (email) => {
        let rex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({
            emailError: rex.test(String(email).toLowerCase()) ? null : 'Please enter a valid email.'
        })
    }

    noEmptyFields = () => {
        const { selectedDate, selectedTimezone } = this.state
        return !!selectedDate && !!selectedTimezone
    }

    registrationSuccess = () => {
        const { session } = this.props;
        const { email } = this.state;

        if (!!session.registration) {
            return session.registration.email === email
        }
        return false
    }

    getFormStatus = () => {
        const { emailError } = this.state;

        switch (true) {
            case (!emailError && this.noEmptyFields() && this.registrationSuccess()):
                return 'success';
            case (!emailError && this.noEmptyFields()):
                return 'complete';
            default:
                return 'inComplete';
        }
    }

    getButtonStatus = () => {
        return {
            complete: 'ready',
            inComplete: 'notReady',
            success: 'success',
        }[this.getFormStatus()]
    }

    handleSubmit = async () => {
        const { email, name, selectedTimezone, selectedDate, selectedSchedule } = this.state;

        const formisValidated = this.getFormStatus() === 'complete';
        if (formisValidated) {
            try {
                const registration = await createRegistration({
                    email,
                    name,
                    event: {
                        origin_timezone: selectedTimezone,
                        start_time: selectedDate,
                        schedule: selectedSchedule,
                    }

                })

                if (registration) {
                    this.setState({
                        error: false,
                        registrationMessage: registration
                    })
                }

            } catch (err) {

                this.setState({
                    error: true,
                    registrationMessage: err
                })
            }
        }
    }

    render() {
        const { schedule, timezones } = this.props;
        const { availableTimes, email, emailError, name } = this.state;

        let timeZoneOptions = []
        timezones.forEach((time) => {
            timeZoneOptions.push({
                value: time,
                label: time
            })
        })

        const dateOptions = availableTimes.map((time) => {
            return {
                value: time,
                label: moment(time.origin_start_time).format('dddd, Do MMMM YYYY')
            }
        })

        return (
            <ModalWrapper>
                <Input
                    label="Email"
                    placeholder="Email"
                    required={true}
                    value={email}
                    validation={this.validateEmail}
                    onChange={this.changeEmail}
                    error={emailError}
                    type="email"
                />
                <Input
                    label="Name"
                    placeholder="Name"
                    required={false}
                    value={name}
                    onChange={this.changeName}
                    type="email"
                />
                <StyledDropDown
                    customStyles={{
                        container: (provided) => ({
                            ...provided,
                            flex: '1',
                        })
                    }}
                    required={true}
                    options={timeZoneOptions}
                    handleChange={this.changeTimezone}
                    placeholder={"Select timezone"}
                />
                <StyledDropDown
                    customStyles={{
                        container: (provided) => ({
                            ...provided,
                            flex: '1 0 100%',
                            marginBottom: 14
                        })
                    }}
                    required={true}
                    handleChange={this.changeDate}
                    options={dateOptions}
                    placeholder={"Select date"}
                />
                <Button status={this.getButtonStatus()} onPress={this.handleSubmit} >Submit</Button>
            </ModalWrapper>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    const { location } = ownProps;
    const query = qs.parse(location.search, { ignoreQueryPrefix: true })

    const {
        schedules,
        session
    } = state;
    const schedule = schedules[query.video] || {}

    let timezones = new Set([])

    if (!!Object.keys(schedule).length) {
        schedule.future_events.forEach((time) => {
            timezones.add(time.origin_timezone)
        })
    }

    return {
        schedule,
        session,
        timezones
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...ScheduleActions,
        ...SessionActions,
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScheduleModal));
