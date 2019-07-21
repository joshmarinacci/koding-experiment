import React from 'react'
import {DraggableWindow} from './DraggableWindow'


export const TestsView = ({fun,editor, processor}) => {
    return <DraggableWindow fun={fun} editor={editor} title={"tests for " + fun.target} type="tests">
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
