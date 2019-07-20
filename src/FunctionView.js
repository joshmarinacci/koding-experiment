import React from 'react';
import {DraggableWindow} from './DraggableWindow'

export const FunView = ({fun,editor}) => {
    const params = fun.params.map(par => {
        return <span className="param" key={par.name}><i>{par.type}</i><b>{par.name}</b></span>
    })
    return <DraggableWindow type="function" fun={fun} title={fun.name} editor={editor}>
        <div className="signature">
            <span className="name">{fun.name}</span>
            {params}
        </div>
        <div className="body">
            {fun.body}
        </div>
    </DraggableWindow>
}
