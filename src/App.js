import React, { Component } from "react";
import { connect } from 'react-redux';
import {
    BrowserRouter as RoutesWrapper, Switch, Route, Redirect
} from "react-router-dom";
import AuthRoute from './components/AuthRoute';
import WebRoute from './components/WebRoute';
import PageNotFound from './pages/PageNotFound';
import Auth from './pages/Auth';
import Landing from './pages/Landing';
import Viewer from './pages/Viewer';
import Register from './pages/Register';
import VideoIndexAuthor from './pages/VideoIndexAuthor';
import VideoIndexViewer from './pages/VideoIndexViewer.js';
import AccountAuthor from './pages/AccountAuthor';
import AccountViewer from './pages/AccountViewer';
import VideoDetailAuthor from './pages/VideoDetailAuthor';
import VideoDetailViewer from './pages/VideoDetailViewer';
import PostVideo from './pages/PostVideo';
import Analytics from './pages/Analytics';
import FocusGroup from './pages/FocusGroup';
import Webinar from './pages/Webinar';
import Webinars from './pages/Webinars';
import Settings from './pages/Settings';
import Config from "./components/Config";
import {bindActionCreators} from "redux";
import * as AppActions from "./state/actions/app.actions";
import SessionDetail from './pages/SessionDetail';
import WebinarDetail from "./pages/WebinarDetail";


const mapStateToProps = (state) => {
    // const expiresAt = !!session.expiresAt ? JSON.parse(session.expiresAt || {}) : 0;
    // const isAuthenticated = new Date().getTime() < expiresAt;
    // Ideally, we also have an expiration date for the token; when it is about to expire, call a function to refresh the token.

    return {
        ...state
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {...AppActions}, dispatch
    );
};

class App extends Component {

    componentDidMount() {
        const { setupApp } = this.props;
        setupApp();
    }

    render() {
        const isAuthenticated = !!(this.props.session.currentUser || {}).access;
        const isAuthor = isAuthenticated;

        return (
            <RoutesWrapper>
                <Config>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => <Redirect to={isAuthenticated ? '/home' : '/login'} />} />
                        <WebRoute
                            exact
                            path="/landing"
                            component={Landing} />
                        <Route
                            exact
                            path="/viewer/:videoId"
                            component={Viewer} />
                        <Route
                            exact
                            path="/login"
                            render={() => isAuthenticated ? <Redirect to="/home" /> : <Auth />} />
                        <Route
                            exact
                            path="/register"
                            component={Register} />
                        <AuthRoute
                            isAuthor={isAuthor}
                            isAuthorized={isAuthenticated}
                            exact
                            path="/account"
                            component={isAuthor ? AccountAuthor : AccountViewer} />
                        <AuthRoute
                            isAuthor={isAuthor}
                            isAuthorized={isAuthenticated}
                            exact
                            path="/home"
                            component={isAuthor ? VideoIndexAuthor : VideoIndexViewer} />
                        <AuthRoute
                            isAuthor={isAuthor}
                            isAuthorized={isAuthenticated}
                            exact
                            path="/analytics"
                            component={Analytics} />
                        <AuthRoute
                            isAuthor={isAuthor}
                            isAuthorized={isAuthenticated}
                            exact
                            path="/videos/:videoId"
                            component={isAuthor ? VideoDetailAuthor : VideoDetailViewer} />
                        <AuthRoute
                            isAuthor={isAuthor}
                            isAuthorized={isAuthenticated}
                            exact
                            path="/sessions/:sessionId"
                            component={SessionDetail} />
                        <AuthRoute
                            isAuthor={isAuthor}
                            isAuthorized={isAuthenticated && isAuthor}
                            exact path="/webinar"
                            component={Webinar} />
                        <AuthRoute
                            isAuthor={isAuthor}
                            isAuthorized={isAuthenticated && isAuthor}
                            exact path="/webinars"
                            component={Webinars} />
                        <AuthRoute
                            isAuthor={isAuthor}
                            isAuthorized={isAuthenticated && isAuthor}
                            exact path="/webinars/:webinarId"
                            component={WebinarDetail} />
                        <AuthRoute
                            isAuthor={isAuthor}
                            isAuthorized={isAuthenticated && isAuthor}
                            exact path="/focusgroup"
                            component={FocusGroup} />
                        <AuthRoute
                            isAuthor={isAuthor}
                            isAuthorized={isAuthenticated && isAuthor}
                            exact path="/settings"
                            component={Settings} />
                        <AuthRoute
                            isAuthor={isAuthor}
                            isAuthorized={isAuthenticated && isAuthor}
                            exact path="/post-video"
                            component={PostVideo} />
                        <Route
                            component={PageNotFound} />
                    </Switch>
                </Config>
            </RoutesWrapper>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
