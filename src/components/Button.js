import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const buttonTheme = {
    notReady: {
        backgroundColor: '#cccccc',
        borderColor: '#cccccc',
        cursor: 'not-allowed',
        boxShadow: {
            base: '0 0 2px #9e9e9e45',
            hover: '0 0 6px #9e9e9eb5',
        }
    },
    ready: {
        backgroundColor: '#2684ff',
        borderColor: '#2684ff',
        cursor: 'pointer',
        boxShadow: {
            base: '0 0 2px #2684ff45',
            hover: '0 0 6px #2684ff',
        }
    },
    success: {
        backgroundColor: 'green',
        borderColor: 'green',
        cursor: 'not-allowed',
        boxShadow: {
            base: '0 0 2px #2684ff45',
            hover: '0 0 6px #2684ff',
        }
    }
}

const StyledButton = styled(props => <button {...props} />)`
    outline: none; 
    display: flex; 
    background: ${props => buttonTheme[props.status].backgroundColor}
    color: white;
    justify-content: center; 
    align-items: center; 
    border: 1px solid;
    border-color: ${props => buttonTheme[props.status].backgroundColor}
    border-radius: 4px; 
    box-shadow: ${props => buttonTheme[props.status].boxShadow.base}
    transition: all 200ms linear;
    padding: 4px 8px;
    cursor: ${props => buttonTheme[props.status].cursor}

    :hover {
        box-shadow: ${props => buttonTheme[props.status].boxShadow.hover}
    }

    :active {
        border: 1px solid #569fff;
        background: #569fff
    }
    
    :focus {
        outline: none;
    }
`


const Button = ({ children, status = 'ready', onPress }) => {

    const renderContent = () => {
        switch(status) {
            case 'ready': 
                return (
                    <React.Fragment>
                        {children}
                    </React.Fragment>
                );
            case 'success': 
                return (
                    <React.Fragment>
                        <span>Success!</span>
                    </React.Fragment>
                );
            default: 
                return (
                    <React.Fragment>
                        {children}
                    </React.Fragment>
                );
        }
    }
    
    return (
        <StyledButton onClick={onPress && status === 'ready' ? onPress : null} status={status}>{renderContent()}</StyledButton>
    )
}

export default Button