import React, { Fragment, useCallback } from 'react';

function Form(props) {
    const { onSubmit } = props;
    const handleSubmit = useCallback(event => {onSubmit(event)}, [onSubmit]);
    
    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                {props.children}
            </form>

        </Fragment>
    )
}

export default Form;
