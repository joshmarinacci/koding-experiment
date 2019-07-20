import React from 'react'

export const DraggableWindow = ({fun, editor, children, title}) => {
    return <div className="tests window" style={{
        left: fun.position.x + "px",
        top: fun.position.y + "px"
    }}>
        <header onMouseDown={(e) => {
            // console.log(e.clientX, e.clientY)
            // console.log(e.target)
            const rect = e.target.getBoundingClientRect()
            // console.log(rect)
            const xoff = e.clientX - rect.x
            const yoff = e.clientY - rect.y
            // console.log("off",xoff,yoff)
            const mousemove = (e) => {
                editor.moveWindowTo(fun, e.clientX - xoff, e.clientY - yoff)
            }
            const mouseup = (e) => {
                window.removeEventListener('mousemove', mousemove)
                window.removeEventListener('mouseup', mouseup)
            }
            window.addEventListener('mousemove', mousemove)
            window.addEventListener('mouseup', mouseup)
        }}
        >
            <div className="title">{title}</div>
        </header>
        {children}
    </div>
}
