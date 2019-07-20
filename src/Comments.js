import React from 'react';

export const CommentDocView = (props) => {
    return <div className="comment window" style={{
        left:props.fun.position.x+"px",
        top:props.fun.position.y+"px",
    }}>
        <div className="title">doc</div>
        <div className="body">{props.fun.body}</div>
    </div>
}


