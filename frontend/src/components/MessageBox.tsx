import React from 'react'

interface Props {
    variant?: string
}

const MessageBox: React.FunctionComponent<Props> = props => {
    return (
        <div className={`alert alert-${props.variant || 'info'}`}>
            {props.children}
        </div>
    )
}

export default MessageBox