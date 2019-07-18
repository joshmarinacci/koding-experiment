import React from 'react';
import './App.css'
import 'font-awesome/css/font-awesome.css'
/*
* Editor for function sig. name, then comma separated args
* Editor for function body
* Unit test grid. Fixed size. button to run all tests. Show results.
* implement fib with tests
* implement Roman numeral demo

 */

const genId = (str) => str + Math.floor(Math.random()*100000)

const fibId = genId("fib")

const project = [
    {
        id:fibId,
        type:'function',
        name:'fib',
        params: [
            {
                type:'number',
                name:'count'
            }
        ],
        body: `
        if(count === 0) return 1
        return fib(count-1) + fib(count-2)
        `
    },
    {
        id:genId("tests"),
        type:'tests',
        target:fibId,
        tests: [
            {
                params:[5],
                answer:[8],
                correct:true,
            },
            {
                params:[6],
                answer:[12],
                correct:false,
            }
        ]
    }
]

project.forEach(item => {
    if(item.type === 'function') {
        // item.body = item.body.split("\n").map(line => line.trim()).join("\n")
    }
})

const CanvasView = (props) => {
    return <div className={"canvas"}>{props.children}</div>
}
const FunView = (props) => {
    const params = props.fun.params.map(par => {
        return <span className="param"><i>{par.type}</i><b>{par.name}</b></span>
    })
    return <div className="function window">
        <div className="signature">
            <span className="name">{props.fun.name}</span>
            {params}
        </div>
        <div className="body">
            {props.fun.body}
        </div>
    </div>
}

const TestsView = (props) => {
    return <div className="tests window">
        <div className="title">tests</div>
        <div className="tests-grid">
            <div className="test-headers">
                <header>parameters</header>
                <header>answer</header>
            </div>
            {props.fun.tests.map(test => {
                return <div className="test">
                    <span className="params">{test.params}</span>
                    <span className={`answer ${test.correct?"correct":"incorrect"}`}>{test.answer}</span>
                </div>
            })}
        </div>
        <div className="spacer"></div>
        <footer>
            <button className="fa fa-play"></button>
            <div className="spacer"></div>
            <button className="fa fa-arrows-alt"></button>
        </footer>
    </div>
}

const Menu = (props) => {
    return <div className="menu">
        <button>save</button>
    </div>
}

function App() {
  return (
      <CanvasView project={project}>
          <Menu/>
          <FunView fun={project[0]}/>
          <TestsView fun={project[1]}/>
      </CanvasView>
  );
}

export default App;
