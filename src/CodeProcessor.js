export class ProcessorSystem {

    constructor(project) {
        this.listeners = {
            changed:[]
        }
        this.project = project
    }

    process(fun) {
        const project = this.project
        const consts = project[2].consts
        const realfun = project[0]
        const parms = realfun.params.map(p => p.name)
        const body = `
        const scope = {
            ${consts.map(c => c.name+":"+c.value).join(",\n")}
        }
        function ${realfun.name} (${parms}) { 
            ${realfun.body} 
        }
        scope.${realfun.name} = ${realfun.name}
        return scope;
        `;
        console.log(body)
        const scope = new Function(...parms,body)()

        const unit = project[1]

        try {
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

