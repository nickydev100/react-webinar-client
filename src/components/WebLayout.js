import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Header = styled.div`
    height: 80px; 
    background: lightgray;
    box-shadow: 0 0 3px rgba(0,0,0,0.2);
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    padding: 1.4rem;
`

const ChildWrapper = styled.div`
    padding: 1.4rem;
`

const AuthSection = styled.div`
    display: flex; 
`

const WebLayout = ({ children }) => {
    return (
        <React.Fragment>
            <Header>
                <h1>emotive logo</h1>
                <AuthSection>
                    <Link to="/login">Login</Link>
                </AuthSection>
            </Header>
            <ChildWrapper>
                {children}
            </ChildWrapper>
        </React.Fragment>
    )
}

export default WebLayout
