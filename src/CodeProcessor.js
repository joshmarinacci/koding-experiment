export class ProcessorSystem {

    constructor(project) {
        this.listeners = {
            changed:[]
        }
        this.project = project
    }

    process(fun) {
        const consts = this.project.find(p => p.type === 'constants').consts
        console.log("found",consts)
        const funs = this.project.filter(p => p.type === 'function')
        const defs = []
        consts.forEach(c => {
            defs.push({name:c.name, value:c.value})
        })
        funs.forEach(realfun => {
            const parms = realfun.params.map(p => p.name)
            console.log("looking at realfun",realfun)
            defs.push({
                name:realfun.name,
                value:`function(${parms}){
                    ${realfun.body}
                }`})
        })
        const body = `const scope = { 
${defs.map(d => d.name+":"+d.value).join(",\n    ")}
}
return scope;
`

        console.log(`-------\n${body}\n---------`)
        const scope = new Function(body)()
        console.log(scope)

        const unit = this.project.find(p => p.type === 'tests')

        try {
            const realfun = this.project.find(p => p.id === unit.target)
            unit.tests.forEach(test => {
                console.log("running test", test, test.params)
                const res = scope[realfun.name].call(null, test.params)
                console.log("result", res)
                test.actual[0] = res
                test.correct = test.answer[0] === test.actual[0]
            })
            this.fireChanged()
        } catch (e) {
            console.error(e)
        }
    }

    fireChanged() {
        this.listeners['changed'].forEach(cb => cb(this.project))
    }
    addEventListener(type,cb) {
        this.listeners['changed'].push(cb)
    }
}

