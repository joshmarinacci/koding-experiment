import React, {useState} from 'react';
import {DraggableWindow} from './DraggableWindow'

export const ConstantsView = ({fun, editor}) => {
    return <DraggableWindow title={'constants'} type={'constants'} fun={fun} editor={editor}>
        {fun.consts.map((test,i) => {
            let ed = <ConstantEditorView cons={test} editor={editor}/>
            if(test.type === 'number') ed = <ConstantNumberEditorView cons={test} editor={editor}/>
            return <div className="const" key={i}>
                <span className="constant-name">{test.name}</span>
                <span className="constant-type">{test.type}</span>
                {ed}
            </div>
        })}

        <div className="spacer"/>

        <footer>
            <button className="fa fa-plus"/>
            <div className="spacer"/>
            <button className="fa fa-arrows-alt"/>
        </footer>
    </DraggableWindow>
}

const ConstantEditorView = ({cons, editor}) => {
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(cons.value)
    if(editing) {
        return <input className="constant-value"
                      value={value}
                      onChange={(e)=>{
                          setValue(e.target.value)
                      }}
                      onKeyDown={(e)=>{
                          if(e.key === 'Enter') {
                              setEditing(false)
                              editor.editConstant(cons,`"${value}"`)
                          }
                      }}
        />
    }
    return <span className="constant-value" onClick={()=> setEditing(true)}>
        {cons.value}
    </span>
}


const ConstantNumberEditorView = ({cons, editor}) => {
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(cons.value)
    if(editing) {
        return <input className="constant-value"
                      type="number"
                      value={value}
                      onChange={e=> setValue(e.target.value)}
                      onKeyDown={e=>{
                          if(e.key === 'Enter') {
                              setEditing(false)
                              editor.editConstant(cons,value)
                          }
                      }}
        />
    }
    return <span className="constant-value" onClick={()=>setEditing(true)}> {cons.value} </span>
}

