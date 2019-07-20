import React from 'react'
import {DraggableWindow} from './DraggableWindow'


export const TestsView = ({fun,editor, processor}) => {
    return <DraggableWindow fun={fun} editor={editor} title="tests" type="tests">
        <div className="tests-grid">
            <div className="test-headers">
                <header>parameters</header>
                <header>answer</header>
                <header>actual</header>
            </div>
            {fun.tests.map((test, i) => {
                return <div className="test" key={i}>
                    <span className="params">{test.params}</span>
                    <span className={`answer`}>{test.answer}</span>
                    <span className={`actual ${test.correct ? "correct" : "incorrect"}`}>{test.actual}</span>
                </div>
            })}
        </div>
        <div className="spacer"></div>
        <footer>
            <button className="fa fa-plus"></button>
            <button className="fa fa-play" onClick={() => processor.process(fun)}></button>
            <div className="spacer"></div>
            <button className="fa fa-arrows-alt"></button>
        </footer>
    </DraggableWindow>
}
