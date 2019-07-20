import React from 'react';
import {DraggableWindow} from './DraggableWindow'

export const CommentDocView = ({fun,editor}) => {
    return <DraggableWindow editor={editor} fun={fun} title={'doc'} type={'comment'}>
        <div className="body">{fun.body}</div>

        <div className="spacer"></div>

        <footer>
            <div className="spacer"></div>
            <button className="fa fa-arrows-alt"></button>
        </footer>
    </DraggableWindow>
}


