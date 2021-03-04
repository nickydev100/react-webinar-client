import React, { Component } from "react";
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SessionActions from '../state/actions/session.actions';
import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';

const FormWrapper = styled.div`

`
const Link = styled.span`
    color: #2684ff; 
    text-decoration: underline;
    transition: all 100ms; 
    cursor: pointer;

    :hover {
        color: #175fbe;
    }
`

class Auth extends Component {

    state = {
        usernameError: null,
        passError: null,
        passError_two: null,
        email: '',
        username: '',
        password: '',
        password_one: '',
        password_two: '',
        formType: 'login',
        registerError: null,
        loginError: false
    }

    validateEmail = (username) => {
        if (username.includes ('@')) {

            let rex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            const getError = () => {
                if (username.length < 1) {
                    return 'This field is required.'
                }
                if (!rex.test(String(username).toLowerCase())) {
                    return 'Please enter a valid email.'
                }
                return null
            }

            this.setState({
                emailError: getError()
            })
        } else {
            this.setState({
                emailError: username.length === 0 ? 'Please enter a username' : null
            })
        }
    }

    validatePassword = (pass) => {
        let err = null;
        if (pass.length < 5) {
            err = 'Please enter at least 5 characters'
        }
        this.setState({passError: err});
    }

    validatePassword_two = (pass) => {
        const { password_one, password_two } = this.state
        this.setState({
            passError_two: password_one !== password_two ? 'Passwords must match' : null
        })
    }

    updateEmail = (email) => {
        this.setState({ email })
    }

    updatePass = (password) => {
        this.setState({ password })
    }

    updateUsername = (username) => {
        this.setState({ username })
    }

    validateForm = async (type) => {
        const { email, password, password_one, password_two } = this.state;
        if (type === 'login') {
            this.validateEmail(email);
            this.validatePassword(password);
        } else if (type === 'register') {
            this.validateEmail(email);
            this.validatePassword(password_one);
            this.validatePassword_two(password_two);
        }
    }

    handleLogin = async(e) => {
        e.preventDefault();
        await this.validateForm('login');
        const { email, password, usernameError, passError} = this.state;
        if (usernameError || passError) {
            return
        }

        const {login} = this.props;

        try {
            await login( email, password );
        } catch (err) {
            this.setState({
                loginError: true
            })
        }
    }

    handleRegister = async(e) => {
        e.preventDefault();
        await this.validateForm('register');
        const { email, username, password_one, password_two, usernameError, passError, passError_two } = this.state;
        if (usernameError || passError || passError_two ) {
            return;
        }
        const {register} = this.props;
        this.setState({registerError: null});
        try {
            await register({
                email,
                username,
                password1: password_one,
                password2: password_two
            })
        } catch (err) {
            debugger
            let errMessage = [];
            if (err.response && err.response.data) {
                if (err.response.data.email) {
                    errMessage.push(...err.response.data.email)
                }
                if (err.response.data.username){
                    errMessage.push(...err.response.data.username)
                }
                if (err.response.data.password1){
                    errMessage.push(...err.response.data.password1)
                }
            }

            this.setState({
                registerError: errMessage
            })
        }
    }

    switch = (formType) => {
        this.setState({
            usernameError: null,
            passError: null,
            passError_two: null,
            email: '',
            username: '',
            password: '',
            password_one: '',
            password_two: '',
            formType: formType,
            registerError: false,
            loginError: false
        })
    }

    renderForm = () => {
        const { username, email, password, passError, emailError, password_one, password_two, passError_two, formType, usernameError, loginError, registerError } = this.state;

        switch (formType) {
            case 'login':
                return (
                    <FormWrapper>
                        <h1>Sign In</h1>
                        <Input
                            label="User name"
                            placeholder="User name"
                            required={true}
                            value={email}
                            validation={this.validateEmail}
                            onChange={this.updateEmail}
                            error={emailError || usernameError}
                            type="text"
                        />
                        <Input
                            label="Password"
                            placeholder="Password"
                            required={true}
                            value={password}
                            validation={this.validatePassword}
                            onChange={this.updatePass}
                            error={passError}
                            type="password"
                        />
                        <Button onPress={this.handleLogin}>Submit</Button>
                        <p>Not signed up yet? <Link  onClick={() => this.switch('register')}>Register here</Link></p>
                        {loginError && <Alert variant="danger">There has been an error in your login process.</Alert>}
                    </FormWrapper>
                )
            case 'register':
                return (
                    <FormWrapper>
                        <h1>Register</h1>
                        <Input
                            label="Email"
                            placeholder="Email"
                            required={true}
                            value={email}
                            validation={this.validateEmail}
                            onChange={this.updateEmail}
                            error={emailError}
                            type="email"
                        />
                        <Input
                            label="Username"
                            placeholder="Username"
                            value={username}
                            onChange={this.updateUsername}
                            error={usernameError}
                            type="text"
                        />
                        <Input
                            label="Password"
                            placeholder="Password"
                            required={true}
                            value={password_one}
                            validation={this.validatePassword}
                            onChange={(password_one) => this.setState({ password_one })}
                            error={passError}
                            type="password"
                        />
                        <Input
                            label="Password confirmation"
                            placeholder="Password confirmation"
                            required={true}
                            value={password_two}
                            validation={this.validatePassword_two}
                            onChange={(password_two) => this.setState({ password_two })}
                            error={passError_two}
                            type="password"
                        />
                        <Button onPress={this.handleRegister}>Submit</Button>
                        <p>Already have an account? <Link onClick={() => this.switch('login')} to="/login">Sign in</Link></p>
                        {registerError &&
                            <Alert variant="danger">
                                There has been an error in your registration process.
                                {registerError.length > 0 &&
                                    <ul>
                                        {registerError.map((error, index) => {
                                            return <li key={index}>{error}</li>
                                        })}
                                    </ul>}
                            </Alert>
                        }
                    </FormWrapper>
                )
            default:
                return <div></div>
        }
    }

    render() {

        const { formType } = this.state;

        return (
            <Container className="pt-3 pt-md-4">
                <Row className="justify-content-md-center">
                    <Col xs="12" md={6}>
                        {this.renderForm(formType)}
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        session
    } = state;

    return {
        session
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...SessionActions,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
