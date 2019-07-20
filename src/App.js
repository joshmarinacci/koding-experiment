import React, {Component} from 'react';
import './App.css'
import 'font-awesome/css/font-awesome.css'
import {CommentDocView} from './Comments'
import {TestsView} from './Tests'
import {FunView} from './FunctionView'
import {ProcessorSystem} from './CodeProcessor'
import {ConstantsView} from './ConstantsView'
import {ProjectEditor} from './ProjectEditor'

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
        name:'grav',
        params: [
            {
                type:'number',
                name:'seconds'
            }
        ],
        body: `
return scope.firstname 
    + " can jump "
    + scope.gravity * seconds
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
                params:[1],
                answer:[],
                actual:[],
                correct:true,
            },
            {
                params:[2],
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
    }
]

const Processor = new ProcessorSystem(project)
const ed = new ProjectEditor(project)

const CanvasView = (props) => {
    return <div className={"canvas"}>{props.children}</div>
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
            this.setState({project:project})
        })
    }

    render() {
        const project = this.state.project
        return (
            <CanvasView project={project}>
                <Menu/>
                <FunView fun={project[0]}/>
                <TestsView fun={project[1]} processor={Processor}/>
                <ConstantsView fun={project[2]} editor={ed}/>
                <CommentDocView fun={project[3]}/>
            </CanvasView>
        )
    }
}

export default App;
