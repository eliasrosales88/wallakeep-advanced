import React, { Fragment } from 'react'

function Label(props) {
    const { htmlFor, labelText } = props;
    return (
        <Fragment>
<label htmlFor={ htmlFor }>{ labelText }</label>
        </Fragment>
    )
}

export default Label
