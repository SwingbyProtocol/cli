const Command = require('../command')

class SwapsStatsCommand extends Command {
    constructor(options) {
        super(options)
        this.name = 'stats'
        this.summary = 'Retrieve network swap statistics'
    }

    execute(params) {
        console.log('fetching stats')
        this.complete()
    }
}

module.exports = SwapsStatsCommand