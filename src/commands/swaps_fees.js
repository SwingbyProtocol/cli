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
        return client.getSwapFees()
            .catch(console.error)
    }

    render(params, data) {
        const { flags } = params
        const { table, raw } = flags
        if (raw) {
            return data.forEach(element => {
                console.log(element)
            })
        }
        data.forEach(element => {
            console.log(`${element.currency}: BridgeFee: ${element.bridgeFeePercent}% MinerFee: ${element.minerFee}`)
        })
    }
}

module.exports = SwapsFeesCommand