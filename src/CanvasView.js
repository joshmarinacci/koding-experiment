import React, {useCallback} from 'react'
import {DraggableWindow} from './DraggableWindow'

export const CanvasView = ({fun,editor}) => {
    const canvasRef = useCallback(node => editor.setCanvasRef(fun,node))
    return <DraggableWindow fun={fun} editor={editor} title={fun.name} type="canvas">
        <canvas ref={canvasRef} width={fun.width} height={fun.height}/>
    </DraggableWindow>
}