import React from 'react';

export const ConstantsView = (props) => {
    return <div className="constants window" style={{
        left:props.fun.position.x+"px",
        top:props.fun.position.y+"px",
    }}>
        <div className="title">constants</div>

        {props.fun.consts.map((test,i) => {
            return <div className="const" key={i}>
                <span className="constant-name">{test.name}</span>
                <span className="constant-type">{test.type}</span>
                <ConstantEditorView cons={test}/>
            </div>
        })}
    </div>
}

const ConstantEditorView = (props) => {
    return <span className="constant-value"
                 onClick={()=>{
                     console.log("going to edit")
                 }}
    >
        {props.cons.value}
    </span>
}

