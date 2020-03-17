const commandLineUsage = require('command-line-usage')

const defaultValidate = (args) => {
    return true
}

const defaultRouteFunc = (commands, params, helpFunc) => {
    const { relativeArgs } = params
    const nextArg = getNextArg(relativeArgs)
    for (let i = 0; i < commands.length; i++) {
        if (commands[i].match(nextArg)) {
            commands[i].execute(params)
        }
    }
}

function getNextArg(args) {
    if (args.length > 0 && typeof args[0] === 'string') {
        return args[0]
    }
    return ''
}

class Handler {
    constructor(name, commands, options = {}) {
        const {
            validatorFunc = defaultValidate,
            routeFunc = defaultRouteFunc
        } = options
        this.name = name
        this.commands = commands
        this.validatorFunc = validatorFunc.bind(this)
        this.routeFunc = routeFunc.bind(this)
    }

    route(params) {
        const nextArg = getNextArg(params.relativeArgs)
        if (nextArg === 'help' || nextArg === '--help') {
            return this.help()
        }
        return this.routeFunc(this.commands, params)
    }

    validate(params) {
        return this.validatorFunc(params)
    }

    getName() {
        return this.name
    }

    help() {
        let sections = []
        this.commands.forEach((cmd) => {
            sections = sections.concat(cmd.getDefinition())
        })
        const usages = {
            header: this.name,
            content: sections
        }
        console.log(commandLineUsage(usages))
    }
}
module.exports = Handler