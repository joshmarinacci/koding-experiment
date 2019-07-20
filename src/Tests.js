import React from 'react'
import {DraggableWindow} from './DraggableWindow'


export const TestsView = (props) => {
    return <DraggableWindow fun={props.fun} editor={props.editor} title={"tests"}>
        <div className="tests-grid">
            <div className="test-headers">
                <header>parameters</header>
                <header>answer</header>
                <header>actual</header>
            </div>
            {props.fun.tests.map((test, i) => {
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
            <button className="fa fa-play" onClick={() => props.processor.process(props.fun)}></button>
            <div className="spacer"></div>
            <button className="fa fa-arrows-alt"></button>
        </footer>
    </DraggableWindow>
}
