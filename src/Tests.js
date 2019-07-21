import React from 'react'
import {DraggableWindow} from './DraggableWindow'

const FunctionChooser = ({fun,project, target, editor}) => {
    const funs = project.filter(p => p.type === 'function')
            .map(fun => {
                return <option key={fun.id} value={fun.id}>{fun.name}</option>
            })
    return <select value={target}
                   onChange={(e)=>editor.setTestsTarget(fun,e.target.value)}
    >{funs}</select>
}

export const TestsView = ({fun, editor, processor, project}) => {
    const title = <span> test <FunctionChooser fun={fun} project={project} target={fun.target} editor={editor}/></span>
    return <DraggableWindow fun={fun} editor={editor} title={title} type="tests">
        <div className="tests-grid">
            <div className="test-headers">
                <span></span>
                <header>parameters</header>
                <header>answer</header>
                <header>actual</header>
            </div>
            {fun.tests.map((test, i) => {
                return <div className="test" key={i}>
                    <button className="fa fa-play" onClick={() => processor.processSingleTest(test,fun)}/>
                    <span className="params">{test.params.join(",")}</span>
                    <span className={`answer`}>{test.answer}</span>
                    <span className={`actual ${test.correct ? "correct" : "incorrect"}`}>{test.actual}</span>
                </div>
            })}
        </div>
        <div className="spacer"/>
        <footer>
            <button className="fa fa-plus"/>
            <button className="fa fa-play" onClick={() => processor.process(fun)}/>
            <div className="spacer"/>
            <button className="fa fa-arrows-alt"/>
        </footer>
    </DraggableWindow>
}
