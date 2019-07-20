export class ProjectEditor {
    constructor(project) {
        this.project = project
    }

    editConstant(cons,val) {
        console.log('setting to the constant',cons,val)
        const conslist = this.project.filter(p => p.type === 'constants')[0].consts
        console.log("list",conslist)
        const cons2 = conslist.filter(c => c.id === cons.id)[0]
        console.log("found ",cons2)
        cons2.value = val
    }
}