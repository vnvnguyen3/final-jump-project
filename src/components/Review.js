import React from 'react'

function Review(props) {
    return (
        <div>
            <p>{props.score}/5 {props.comment}</p>
            <p>-{props.username}</p>
            <br/>
        </div>
    )
}

export default Review
