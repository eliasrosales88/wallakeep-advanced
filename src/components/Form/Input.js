import React, { Fragment, useCallback } from 'react'

function Input(props) {
    const { type, placeholder, onChange, name, className } = props;
    const handleChange = useCallback(event => {onChange(event)}, [onChange]);
    
    switch (type) {
        case "text":
            return (
                <Fragment>
                    <input type= {type} name={name} className={className} placeholder={placeholder} onChange={handleChange} />
                </Fragment>
            )            
        case "textarea":
            return (
                <Fragment>
                    <textarea type= {type} name={name} className={className} placeholder={placeholder} onChange={handleChange} />
                </Fragment>
            )            
    
        default:
            return (
                <Fragment>
                    <input type= {type} name={name} className={className} placeholder={placeholder} onChange={handleChange} />
                </Fragment>
            )    
    }

}

export default Input;
