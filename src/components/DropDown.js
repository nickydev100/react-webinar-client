import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const DropDown = ({ customStyles, handleChange, required, ...rest }) => {
    
    const dropdownStyles = {

        // set any default styles here
        container: (provided, state) => ({
            ...provided,
            marginBottom: 24,
            ...customStyles.container
        }),
        valueContainer: (provided) => ({
            ...provided,
            position: 'relative', 
            ':after': {
                content: `${required ? "'*'" : "''"}`,
                position: 'absolute', 
                top: 4,
                right: 8,
                color: 'red'
            } 
        }),
        ...customStyles
    }


    const [selectedOption, setSelection] = useState({});
    useEffect(() => {
        if (!!handleChange) {
            handleChange(selectedOption)
        }
    }, [handleChange, selectedOption])

    return (
        <Select
            onChange={(val) => setSelection(val)}
            styles={dropdownStyles}
            {...rest}
        />
    )
}

export default DropDown
