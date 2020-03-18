
class Command {
    constructor(options = {}) {
        const {
            onComplete = () => {},
            onError = () => {}
        } = options
        this.onComplete = onComplete
        this.onError = onError
    }

    match(arg) {
        return this.name === arg.toLowerCase().trim()
    }

    complete(data) {
        this.onComplete(data)
    }

    error(err) {
        this.onError(err)
    }

    render(params, data) {
        console.log(data)
    }

    execute(params) {
    }

    getName() {
        return this.name
    }

    getDefinition() {
        return [{
            name: this.name,
            summary: this.summary
        }]
    }
}
module.exports = Command