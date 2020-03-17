const Command = require('../command')
const sdk = require('swingby-js-sdk')
const {
    CFG_NODE_URL,
} = require('../utils/constants')

class SwapsFeesCommand extends Command {
    constructor(options) {
        super(options)
        this.name = 'fees'
        this.summary = 'Retrieve current network fees'
    }

    execute(params) {
        const { config } = params
        const client = new sdk.NodeHttpClient({ url: config.get(CFG_NODE_URL) })
        client.getSwapFees()
            .then((fees) => {
                fees.forEach(element => {
                    console.log(element)
                })
            })
            .catch(console.error)
    }
}

module.exports = SwapsFeesCommand