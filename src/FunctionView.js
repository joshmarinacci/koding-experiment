import React, {useState} from 'react';
import {DraggableWindow} from './DraggableWindow'

export const FunView = ({fun,editor}) => {
    const [editable, setEditing] = useState(false)
    const params = fun.params.map(par => {
        return <span className="param" key={par.name}><i>{par.type}</i><b>{par.name}</b></span>
    })
    return <DraggableWindow type="function" fun={fun} title={fun.name + " " + fun.id} editor={editor}>
        <div className="signature">
            <span className="name">{fun.name}</span>
            {params}
        </div>
        {editable?<EditableBody fun={fun} onClick={()=>setEditing(false)}/>:<ViewOnlyBody fun={fun} onClick={()=>setEditing(true)}/>}
    </DraggableWindow>
}


const ViewOnlyBody = ({fun, onClick}) => {
    return <div className="body" onClick={onClick}>{fun.body}</div>
}

const EditableBody = ({fun, onClick}) => {
    return <div>
        <textarea value={fun.body}/>
        <button onClick={onClick}>done</button>
    </div>
}