import React, { Fragment } from 'react'

function Button(props) {
    const { className, buttonText } = props
    return (
        <Fragment>
            <button type="submit" className={ className }>{ buttonText }</button>
        </Fragment>
    )
}

export default Button
