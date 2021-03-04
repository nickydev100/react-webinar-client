import React from 'react';
import { Route, Redirect } from 'react-router';
import DashboardLayout from './DashboardLayout';

const AuthRoute = ({component: Component, ...rest}) => {
    const { isAuthorized, isAuthor } = rest;

    if (!isAuthorized || !Component) { return (
      <Route render={() => (<Redirect to="/login" />)} />
    ); }

    return (
        <Route {...rest} render={props => (
            <DashboardLayout isAuthor={isAuthor}>
                <Component {...props} />
            </DashboardLayout>
        )} />
    );
};

export default AuthRoute;
