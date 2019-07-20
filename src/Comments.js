import React from 'react';

export const CommentDocView = (props) => {
    return <div className="comment window" style={{
        left:props.fun.position.x+"px",
        top:props.fun.position.y+"px",
    }}>
        <div className="title">doc</div>
        <div className="body">{props.fun.body}</div>

        <div className="spacer"></div>

        <footer>
            <div className="spacer"></div>
            <button className="fa fa-arrows-alt"></button>
        </footer>
    </div>
}


