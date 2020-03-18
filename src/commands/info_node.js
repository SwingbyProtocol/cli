const Command = require('../command')
const sdk = require('swingby-js-sdk')
const {
    CFG_NODE_URL,
} = require('../utils/constants')

class InfoNodeCommand extends Command {
    constructor(options) {
        super(options)
        this.name = 'node'
        this.summary = 'Retrieve node info'
    }

    execute(params) {
        const { config } = params
        const client = new sdk.NodeHttpClient({ url: config.get(CFG_NODE_URL) })
        return client.getStatus()
            .catch(console.error)
    }

    render(params, data) {
        const { flags } = params
        const { table, raw } = flags
        if (raw) {
            return console.log(data)
        }
        const ni = data.nodeInfo
        const si = data.swapInfo
        console.log(`${ni.moniker} (version: ${ni.version}): ${ni.listenAddr} (${si.coin1} -> ${si.coin2})`)
    }
}

module.exports = InfoNodeCommand