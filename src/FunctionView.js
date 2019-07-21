import React, {useState} from 'react';
import {DraggableWindow} from './DraggableWindow'

export const FunView = ({fun,editor}) => {
    const [editable, setEditing] = useState(false)
    const params = fun.params.map(par => {
        return <span className="param" key={par.name}><b>{par.name}</b></span>
    })
    return <DraggableWindow type="function" fun={fun} title={fun.name} editor={editor}>
        <div className="signature">
            <EditableLabel fun={fun} editor={editor}>{fun.name}</EditableLabel>
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

const EditableLabel = ({fun, editor}) => {
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(fun.name)
    if(editing) {
        return <input
            type="text"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            onKeyDown={e=>{
                if(e.key === 'Enter') {
                    setEditing(false)
                    editor.editFunctionName(fun,value)
                }
            }}
        />
    } else {
        return <span className="name" onClick={()=>setEditing(true)}>{fun.name}</span>
    }

}