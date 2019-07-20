import React, {useState} from 'react';

export const ConstantsView = (props) => {
    return <div className="constants window" style={{
        left:props.fun.position.x+"px",
        top:props.fun.position.y+"px",
    }}>
        <div className="title">constants</div>

        {props.fun.consts.map((test,i) => {
            let ed = <ConstantEditorView cons={test} editor={props.editor}/>
            if(test.type === 'number') ed = <ConstantNumberEditorView cons={test} editor={props.editor}/>
            return <div className="const" key={i}>
                <span className="constant-name">{test.name}</span>
                <span className="constant-type">{test.type}</span>
                {ed}
            </div>
        })}

        <div className="spacer"></div>

        <footer>
            <button className="fa fa-plus"></button>
            <div className="spacer"></div>
            <button className="fa fa-arrows-alt"></button>
        </footer>
    </div>
}

const ConstantEditorView = (props) => {
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(props.cons.value)
    if(editing) {
        return <input className="constant-value"
                      value={value}
                      onChange={(e)=>{
                          setValue(e.target.value)
                      }}
                      onKeyDown={(e)=>{
                          if(e.key === 'Enter') {
                              setEditing(false)
                              props.editor.editConstant(props.cons,`"${value}"`)
                          }
                      }}
        />
    }
    return <span className="constant-value"
                 onClick={()=>{
                     console.log("going to edit")
                     setEditing(true)
                 }}
    >
        {props.cons.value}
    </span>
}


const ConstantNumberEditorView = (props) => {
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(props.cons.value)
    if(editing) {
        return <input className="constant-value"
                      type="number"
                      value={value}
                      onChange={e=> setValue(e.target.value)}
                      onKeyDown={e=>{
                          if(e.key === 'Enter') {
                              setEditing(false)
                              props.editor.editConstant(props.cons,value)
                          }
                      }}
        />
    }
    return <span className="constant-value" onClick={()=>setEditing(true)}>
        {props.cons.value}
    </span>
}

