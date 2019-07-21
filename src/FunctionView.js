import React, {useState} from 'react';
import {DraggableWindow} from './DraggableWindow'

export const FunView = ({fun,editor}) => {
    const [editable, setEditing] = useState(false)
    const params = fun.params.map(par => {
        return <span className="param" key={par.name}><b>{par.name}</b></span>
    })
    return <DraggableWindow type="function" fun={fun} title={fun.name + " " + fun.id} editor={editor}>
        <div className="signature">
            <span className="name">{fun.name}</span>
            ({params})
        </div>
        {editable?<EditableBody fun={fun} editor={editor} onClick={()=>setEditing(false)}/>:<ViewOnlyBody fun={fun} onClick={()=>setEditing(true)}/>}
    </DraggableWindow>
}


const ViewOnlyBody = ({fun, onClick}) => {
    return <div className="body" onClick={onClick}>{fun.body}</div>
}

const EditableBody = ({fun, onClick,editor}) => {
    const [body,setBody] = useState(fun.body)
    return <>
        <textarea value={body} onChange={(e)=>setBody(e.target.value)}/>
        <button onClick={()=>{
            editor.updateFunctionBody(fun,body)
            onClick()
        }}>done</button>
        </>
}