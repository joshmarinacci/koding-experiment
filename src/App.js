import React, {Component} from 'react';
import './App.css'
import 'font-awesome/css/font-awesome.css'
import {CommentDocView} from './Comments'
import {TestsView} from './Tests'
import {FunView} from './FunctionView'
import {ProcessorSystem} from './CodeProcessor'
import {ConstantsView} from './ConstantsView'
import {ProjectEditor} from './ProjectEditor'
import {genId} from './utils'
import {CanvasView} from './CanvasView'

const fibId = genId("fib")

const project = [
    {
        position: {
            x: 30,
            y: 40,
        },
        id:fibId,
        type:'function',
        name:'drawBall',
        params: [
            {
                type:'number',
                name:'x'
            },
            {
                type:'number',
                name:'y',
            },
            {
                type:'string',
                name:'state'
            }
        ],
        body: `
scope.clearCanvas()
console.log('xy is',x,y,state);
const ctx = scope.canvas1.getContext('2d')
ctx.fillStyle = 'white'
ctx.fillRect(0,0,scope.canvas1.width,scope.canvas1.height)

ctx.fillStyle = 'blue'
if(state === 'fast') {
    ctx.fillStyle = 'red'
}
ctx.beginPath()
ctx.arc(x,y, 20,   0,2*Math.PI)
ctx.fill()

`
    },
    {
        position: {
            x:30,
            y:670,
        },
        id:genId("format"),
        type:'function',
        name:'clearCanvas',
        params: [
        ],
        body: `
        console.log("clearing")
const ctx = scope.canvas1.getContext('2d')
ctx.fillStyle = 'white'
ctx.fillRect(0,0,scope.canvas1.width,scope.canvas1.height)
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
                params:[50,50,'normal'],
                answer:[],
                actual:[],
                correct:true,
            },
            {
                params:[60,60,'fast'],
                answer:[],
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
                value:'"Alice"'
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
    },
]

project.push({
    position: {
        x:700,
        y:40,
    },
    id:genId("canvas"),
    type:'canvas',
    name:'canvas1',
    width:100,
    height:100,
})


const Processor = new ProcessorSystem(project)
const ed = new ProjectEditor(project)

const BackgroundCanvas = (props) => {
    return <div className={"canvas"}>{props.children}</div>
}

const Menu = (props) => {
    return <div className="menu">
        <button>save</button>
        <button onClick={()=>ed.addNewFunction()}>new function</button>
        <button onClick={()=>ed.addNewComment()}>new comment</button>
        <button onClick={()=>ed.addNewCanvasConstant()}>new canvas</button>
        <button onClick={()=>ed.addNewTestPanel()}>new tests</button>
    </div>
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project:project
        }
        Processor.addEventListener('changed',(project)=>{
            this.setState({project:project})
        })
        ed.addEventListener('changed',(project)=>{
            this.setState({project:project})
        })
    }

    render() {
        const project = this.state.project

        return (
            <BackgroundCanvas project={project}>
                <Menu/>
                {
                    project.map(p => this.renderChunk(p))
                }
            </BackgroundCanvas>
        )
    }
    renderChunk(p) {
        if(p.type === 'function') return <FunView fun={p} key={p.id} editor={ed}/>
        if(p.type === 'tests') return <TestsView fun={p} key={p.id} processor={Processor} editor={ed} project={project}/>
        if(p.type === 'constants') return <ConstantsView fun={p} key={p.id} editor={ed}/>
        if(p.type === 'comment') return <CommentDocView fun={p} key={p.id} editor={ed}/>
        if(p.type === 'canvas') return <CanvasView fun={p} key={p.id} editor={ed}/>

    }

}

export default App;
