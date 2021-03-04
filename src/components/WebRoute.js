import React from 'react';
import { Route } from 'react-router';
import WebLayout from './WebLayout';

const WebRoute = ({component: Component, ...rest}) => {
    
    return (
        <Route {...rest} render={props => (
            <WebLayout >
                <Component {...props} />
            </WebLayout>
        )} />
    );
};

export default WebRoute;
