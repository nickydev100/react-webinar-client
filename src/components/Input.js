import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 24px;

    &::after {
        content: ${props => `'${props.error || ''}'`};
        color: red; 
        font-size: 10px;  
        position: absolute;
        top: calc(100% + 2px);
        left: 8px;
    }
`

const StyledInput = styled(props => <input {...props} />)`
    outline: none; 
    border-radius: 4px; 
    border: 1px solid #cccccc;
    transition: all 100ms linear;
    height: 36px; 
    padding: 2px 8px; 
    width: 100%; 

    :hover {
        border: 1px solid #b3b3b3;
    }

    :focus {
        border: 1px solid #2684ff;
        box-shadow: 0 0 0 1px #2684ff;
    }
`

const Label = styled.span`
    display: inline-block;
    margin-bottom: 0.5rem;
`

const Asterisk = styled.span`
    position: absolute; 
    bottom: 8px; 
    right: 8px; 
    color: red;
`



const Input = ({ handleChange, label, error, containerStyle, validation, required, value, onChange, ...rest }) => {

    return (
        <InputWrapper error={error}>
            {label ? <Label>{label} </Label> : null}
            {required ? <Asterisk>*</Asterisk> : null}
            <StyledInput onBlur={validation ? () => validation(value) : null} type="text" value={value} onChange={(e) => onChange ? onChange(e.target.value) : null} {...rest} />
        </InputWrapper>
    )
}

export default Input
