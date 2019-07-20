import React from 'react';

export const FunView = (props) => {
    const params = props.fun.params.map(par => {
        return <span className="param" key={par.name}><i>{par.type}</i><b>{par.name}</b></span>
    })
    return <div className="function window" style={{
        left:props.fun.position.x+"px",
        top:props.fun.position.y+"px",
    }}>
        <div className="signature">
            <span className="name">{props.fun.name}</span>
            {params}
        </div>
        <div className="body">
            {props.fun.body}
        </div>
    </div>
}
