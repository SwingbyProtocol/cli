const Command = require('../command')
const sdk = require('swingby-js-sdk')
const {
    CFG_NODE_URL,
} = require('../utils/constants')

class InfoPeersCommand extends Command {
    constructor(options) {
        super(options)
        this.name = 'peers'
        this.summary = 'Retrieve connected peers'
    }

    execute(params) {
        const { config } = params
        const client = new sdk.NodeHttpClient({ url: config.get(CFG_NODE_URL) })
        return client.getPeers()
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
            console.log(`${element.moniker} (version: ${element.version} rank: ${element.rank}): ${element.id}`)
        })
    }
}

module.exports = InfoPeersCommand