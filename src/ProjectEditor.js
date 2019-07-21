import {genId} from './utils'

export class ProjectEditor {
    constructor(project) {
        this.project = project
        this.listeners = {
            changed:[]
        }
    }
    addEventListener(type,cb) {
        this.listeners[type].push(cb)
    }

    editConstant(cons,val) {
        const conslist = this.project.filter(p => p.type === 'constants')[0].consts
        const cons2 = conslist.filter(c => c.id === cons.id)[0]
        cons2.value = val
        this.fireChange()
    }
    editFunctionName(fun,val) {
        fun.name = val
        this.fireChange()
    }
    moveWindowTo(obj,x,y) {
        const pos = obj.position
        pos.x = x
        pos.y = y
        this.fireChange()
    }

    setCanvasRef(fun, node) {
        fun.canvasRef = node
    }

    updateFunctionBody(fun,body) {
        fun.body = body
        this.fireChange()
    }

    setTestsTarget(tests, target) {
        tests.target = target
        this.fireChange()
    }


    fireChange() {
        this.listeners.changed.forEach(cb => cb(this.project))
    }

    addNewComment() {
        this.project.push({
            position: {
                x: 100,
                y: 100,
            },
            id:genId("comment"),
            type:'comment',
            name:'new comment',
            body: `This is a new blank comment. Click to edit.`
        })
        this.fireChange()
    }

    addNewFunction() {
        this.project.push({
            position: {
                x: 100,
                y: 100,
            },
            id:genId("function"),
            type:'function',
            name:'newFunName',
            params: [],
            body: `console.log("running");`
        })
        this.fireChange()
    }

    addNewCanvasConstant() {
        this.project.push({
            position: {
                x:100,
                y:100,
            },
            id:genId("canvas"),
            type:'canvas',
            name:'canvas1',
            width:100,
            height:100,
        })
        this.fireChange()
    }

    addNewTestPanel() {
        this.project.push({
            position: {
                x: 100,
                y: 100,
            },
            id:genId("tests"),
            type:'tests',
            target:null,
            tests: [
            {
                params:[1],
                answer:[2],
                actual:[],
                correct:true,
            }
        ]
        })
        this.fireChange()
    }
}