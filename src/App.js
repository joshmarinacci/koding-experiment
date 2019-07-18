import React, {Component} from 'react';
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
        if(count <= 1) return count
        return fib(count-1) + fib(count-2)
        `
    },
    {
        id:genId("tests"),
        type:'tests',
        target:fibId,
        tests: [
            {
                params:[6],
                answer:[8],
                actual:[],
                correct:true,
            },
            {
                params:[7],
                answer:[12],
                actual:[],
                correct:true,
            }
        ]
    }
]

project.forEach(item => {
    if(item.type === 'function') {
        // item.body = item.body.split("\n").map(line => line.trim()).join("\n")
    }
})


class ProcessorSystem {

    constructor() {
        this.listeners = {
            changed:[]
        }
    }

    process(fun) {
        const realfun = project[0]
        const parms = realfun.params.map(p => p.name)
        const body = `
        function ${realfun.name} (${parms}) { 
            ${realfun.body} 
        }
        return ${realfun.name}
        `;
        console.log(body)
        const ffun = new Function(...parms,body)()

        const unit = project[1]

        unit.tests.forEach(test => {
            console.log("running test",test,test.params)
            const res = ffun.call(null,test.params)
            console.log("result",res)
            test.actual[0] = res
            test.correct = test.answer[0] === test.actual[0]
        })
        this.fireChanged()
    }

    fireChanged() {
        this.listeners['changed'].forEach(cb => cb(project))
    }
    addEventListener(type,cb) {
        this.listeners['changed'].push(cb)
    }
}

const Processor = new ProcessorSystem()

const CanvasView = (props) => {
    return <div className={"canvas"}>{props.children}</div>
}
const FunView = (props) => {
    const params = props.fun.params.map(par => {
        return <span className="param" key={par.name}><i>{par.type}</i><b>{par.name}</b></span>
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
                <header>actual</header>
            </div>
            {props.fun.tests.map((test,i) => {
                return <div className="test" key={i}>
                    <span className="params">{test.params}</span>
                    <span className={`answer`}>{test.answer}</span>
                    <span className={`actual ${test.correct?"correct":"incorrect"}`}>{test.actual}</span>
                </div>
            })}
        </div>
        <div className="spacer"></div>
        <footer>
            <button className="fa fa-play" onClick={()=>Processor.process(props.fun)}></button>
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

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project:project
        }
        Processor.addEventListener('changed',(project)=>{
            console.log("updating state")
            this.setState({project:project})
        })
    }

    render() {
        const project = this.state.project
        return (
            <CanvasView project={project}>
                <Menu/>
                <FunView fun={project[0]}/>
                <TestsView fun={project[1]}/>
            </CanvasView>
        )
    }
}

export default App;
