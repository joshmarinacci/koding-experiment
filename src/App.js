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
        position: {
            x: 30,
            y: 40,
        },
        id:fibId,
        type:'function',
        name:'fib',
        params: [
            {
                type:'number',
                name:'seconds'
            }
        ],
        body: `
        return firstname 
            + " can jump "
            + gravity * seconds
            + " feet on earth";
        `
    },
    {
        position: {
            x: 350,
            y: 40,
        },
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
    },
    {
        position: {
            x: 30,
            y: 355,
        },
        id:'constants',
        type:'constants',
        name:'global constants',
        consts:[
            {
                id:genId('const'),
                name:'gravity',
                type:'number',
                value:9.8
            },
            {
                id:genId("const"),
                name:'firstname',
                type:'string',
                value:'Alice'
            }
        ]
    },
    {
        position: {
            x: 350,
            y: 355,
        },
        id:genId("comment"),
        type:'comment',
        name:'comment',
        body: `
            This is a comment used for general documentation. It is associated
            with a function, but is not included in compiled code.
        `
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

const TestsView = (props) => {
    return <div className="tests window" style={{
        left:props.fun.position.x+"px",
        top:props.fun.position.y+"px",
    }}>
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

const ConstantsView = (props) => {
    return <div className="constants window" style={{
        left:props.fun.position.x+"px",
        top:props.fun.position.y+"px",
    }}>
        <div className="title">constants</div>

        {props.fun.consts.map((test,i) => {
            return <div className="const" key={i}>
                <span className="constant-name">{test.name}</span>
                <span className="constant-type">{test.type}</span>
                <span className="constant-value">{test.value}</span>
            </div>
        })}
    </div>
}

const CommentDocView = (props) => {
    return <div className="comment window" style={{
        left:props.fun.position.x+"px",
        top:props.fun.position.y+"px",
    }}>
        <div className="title">doc</div>
        <div className="body">{props.fun.body}</div>
    </div>
}

const Menu = (props) => {
    return <div className="menu">
        <button>save</button>
        <button>new function</button>
        <button>new comment</button>
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
                <ConstantsView fun={project[2]}/>
                <CommentDocView fun={project[3]}/>
            </CanvasView>
        )
    }
}

export default App;
